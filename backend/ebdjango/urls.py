"""ebdjango URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import api

urlpatterns = [
    path('admin/', admin.site.urls),
    # teste de login/register. O url mudará para [get, set]/cookie
    # e as credenciais vêm dos forms no frontend.
    path(
        'register/',
        api.userSignUp, name='userSignUp'
    ),
    path(
        'login/',
        api.userSignIn, name='userSignIn'
    ),

    path(
        'order/<str:userId>',
        api.createOrder, name='createOrder'
    ),  # purchase order
    path(
        'user/<str:userId>/orders',
        api.listOrdersPending, name='getUserOrders'
    ),  # user orders
]
