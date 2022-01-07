import json
import boto3
from botocore.exceptions import ClientError
from django.http import HttpResponse, JsonResponse
from boto3.dynamodb.conditions import Key, Attr
import jwt
import datetime
import time
from .settings import JWT_SECRET_KEY, JWT_ALGORITHM, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY
from uuid import uuid4  # para os orderIds


statuscodes = {
    '200': 'OK',
    '201': 'Created',
    '400': 'Bad Request',
    '404': 'Not Found',
    '500': 'Internal Server Error',
}

stepfunctions = boto3.client(
    'stepfunctions',
    region_name="us-east-1",

)

orderAWSresource = "arn:aws:states:us-east-1:478304282754:stateMachine:OrderStateMachine"


# Utils ---
def getStatusCode(code):
    return {str(code): statuscodes[str(code)]}


def connectToDb():
    """
    Returns connection to DynamoDB
    """
    return boto3.resource(
        'dynamodb',
        # region_name='us-east-1'
    )


# JWT ---
def getCookie(req, cookiename):
    return req.COOKIES.get(cookiename)


def encodeToken(credentials, validity_seconds):
    """
    Encode 'credentials' with secret key.
    """
    try:
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, seconds=validity_seconds),
            'iat': datetime.datetime.utcnow(),
            'userId': credentials[0],
            'password': credentials[1],
        }
        return jwt.encode(
            payload,
            key=JWT_SECRET_KEY,
            algorithm=JWT_ALGORITHM
        ).decode('utf-8')
    except Exception as e:
        return e


def decodeToken(auth_token):
    """
    Decode the encoded token with given secret_key.
    """
    try:
        payload = jwt.decode(
            auth_token,
            key=JWT_SECRET_KEY,
            algorithm=JWT_ALGORITHM
        )
        return {'auth': True, 'error': '', 'decoded': payload}
    except jwt.ExpiredSignatureError:
        return {'auth': False, 'error': 'Token expired'}
    except jwt.InvalidTokenError:
        return {'auth': False, 'error': 'Invalid token'}


# Login and Registration ---
def getUser(userId, userPassword, dynamodb=None):
    if not dynamodb:
        dynamodb = connectToDb()
    table = dynamodb.Table('users')
    try:
        res = table.scan(
            FilterExpression=Key('userId').eq(
                userId) & Attr('password').eq(userPassword),
            ProjectionExpression='userId, email, password',
        )
    except ClientError as e:
        print('buceta')
        return JsonResponse(status=500, data=getStatusCode(500))
    if len(res['Items']):
        pw = res['Items'][0].get('password')
        if pw == userPassword:
            return JsonResponse(status=200, data=getStatusCode(200))
        elif pw == None:
            return JsonResponse(status=404, data=getStatusCode(404))
        elif pw != userPassword:
            return JsonResponse(status=400, data=getStatusCode(400))
    return JsonResponse(status=500, data=getStatusCode(500))


def userExists(userId, password):
    """
    Returns if user has valid credentials
    """
    userCheck = getUser(userId, password)
    print(userCheck)
    if (userCheck != None) and (userCheck.status_code == 200):
        return True
    else:
        return False


def verifyUserToken(token, insertedUserId, insertedPassword):
    """
    Checks if credentials encoded in JWT
    match to the ones inserted in
    the login form
    """
    credentials = decodeToken(token)['decoded']
    enc_userId = credentials['userId']
    print(enc_userId, insertedUserId)
    if ((enc_userId == insertedUserId) and userExists(enc_userId, insertedPassword)):
        return JsonResponse(status=200, data=getStatusCode(200))
    else:
        return JsonResponse(status=400, data=getStatusCode(400))


def assignToken(userId, password):
    """
    Assign token to user
    """
    token = encodeToken(
        [userId, password],
        validity_seconds=12*24*60*60
    )
    res = JsonResponse(status=200, data={'token': token})
    res.set_cookie(
        key='userToken',
        value=token,
        path='/'
        # httponly=True
    )
    return res


def userSignIn(req):
    """
    Le credenciais submetidas,
    Verifica se ja existe um user token>
    Se existir, verifica se as credenciais do
    token batem certo com as credenciais inseridas
    no LoginForm.
    Se nao existir, cria.
    """
    if req.method == 'POST':
        userId = req.POST.get('userId')
        password = req.POST.get('password')
        userToken = getCookie(req, 'userToken')
        if ((userToken is None) or (userToken == '')):
            if userExists(userId, password):
                return assignToken(userId, password)
            return JsonResponse(status=404, data=getStatusCode(404))
        # Cookie is present, bypass token encoding
        else:
            return verifyUserToken(userToken, userId, password)


def putUser(userId, email, password, dynamodb=None):
    """
    Inserts user in the database.
    """
    if not dynamodb:
        dynamodb = connectToDb()
    table = dynamodb.Table('users')
    res = table.put_item(
        Item={
            'userId': userId,
            'email': email,
            'password': password,
        }
    )
    return JsonResponse(status=201, data=getStatusCode(201))


def userSignUp(req):
    if req.method == 'POST':
        userId = req.POST.get('userId')
        email = req.POST.get('email')
        password = req.POST.get('password')
        if getUser(userId, password):
            if putUser(userId, email, password).status_code == 200:
                print('hello: --- ')
                return assignToken(userId, password)
            else:
                return JsonResponse(status=500, data=getStatusCode(500))
        return JsonResponse(status=400, data=getStatusCode(400))


# Queries and insertions
def getUserOrders(req, userId, dynamodb=None):
    """
    Returns all orders
    where orders.userId == userId
    """
    token = req.META.get('HTTP_AUTHORIZATION')
    token_userId = decodeToken(token)['decoded']['userId']
    if userId == token_userId:
        if not dynamodb:
            dynamodb = connectToDb()
        table = dynamodb.Table('orders')
        res = table.scan(
            FilterExpression=Attr('userId').eq(userId),
            ProjectionExpression='orderId',
        )
        print(res['Items'])
        return JsonResponse(status=200, data={'orders': res['Items']})
    else:
        return JsonResponse(status=400, data=getStatusCode(400))


def getOrderDetails(req, orderId, userId, dynamodb=None):
    """
    Returns info about order 'orderId' made by 'userId'
    """
    token = req.META.get('HTTP_AUTHORIZATION')
    token_userId = decodeToken(token)['decoded']['userId']
    if userId == token_userId:
        if not dynamodb:
            dynamodb = connectToDb()
            table = dynamodb.Table('orders')
            res = table.scan(
                FilterExpression=Attr('userId').eq(
                    userId) & Key('orderId').eq(orderId),
                ProjectionExpression='isDelivered, isSigned, orderDate, deliveryDate',
            )
            if len(res['Items']):
                return HttpResponse(res['Items'])
            return JsonResponse(status=404, data=getStatusCode(404))
        return JsonResponse(status=400, data=getStatusCode(400))
    return JsonResponse(status=400, data=getStatusCode(400))


def listOrdersPending(req, userId):
    token = req.META.get('HTTP_AUTHORIZATION')
    token_userId = decodeToken(token)['decoded']['userId']
    if userId == token_userId:
        response = stepfunctions.list_executions(
            stateMachineArn=orderAWSresource,
            statusFilter='RUNNING',
            maxResults=10
        )
        userOrders = {}
        tagResource = stepfunctions.list_tags_for_resource(
            resourceArn=orderAWSresource
        )
        for execution in response["executions"]:
            nameExec = execution["name"]
            if userId in nameExec:
                details = stepfunctions.describe_execution(
                    executionArn=execution["executionArn"])
                execStat = details["status"]
                for i in tagResource["tags"]:
                    if i["key"] == nameExec:
                        vals = i["value"].split()
                        if len(vals) > 1:
                            deliveryTime, mp3Link = vals[0], vals[1]
                            userOrders[nameExec] = {
                                "mp3Link": mp3Link,
                                "deliveryTime": deliveryTime,
                                "OrderDate": details["startDate"],
                                "Status": execStat
                            }
                            break
        return JsonResponse(userOrders)


def createOrder(req, userId):
    token = req.META.get('HTTP_AUTHORIZATION')
    token_userId = decodeToken(token)['decoded']['userId']
    if userId == token_userId:
        # unique execution ID{UserID}{TimeStamp}
        print(req.POST)
        nameExec = userId + str(time.time())
        stepfunctions.start_execution(
            stateMachineArn=orderAWSresource,
            name=nameExec,
            input=json.dumps({
                "Text": req.POST.get("order"),
                "Id": nameExec
            })
        )
        # Mandar o erro
        response = {}
        return JsonResponse(response)
    return JsonResponse(status=404, data=getStatusCode(404))
