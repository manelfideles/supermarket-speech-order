import React from 'react';
import { useParams } from 'react-router-dom';
import greenLight from '../assets/greenlight.jpg'
import redLight from '../assets/redlight.jpg'
import fileDownloadIcon from '../assets/downloadfile.svg'
import '../css/OrderDetails.css'
import MainButton from '../components/MainButton'

function getStatusSVG(isDone) {
    return isDone ? <img src={greenLight} alt="true" /> : <img src={redLight} alt="" />
}

function OrderDetails() {
    // query bd with orderId from url
    const { orderId } = useParams()
    let order = {
        ID: '1234',
        'Order Date': '2021-12-19',
        'Delivery Date': '2021-12-22',
        Delivered: false,
        Signed: false,
    } // placeholder information
    console.log(orderId === order.ID);

    return (
        <div class='order-details'>
            <h1>Order <p>{orderId}</p></h1>
            <div class='details-frame'>
                <div class='left-content'>
                    <div class='info'>
                        <p id='info-left'><span>Order Date</span></p>
                        <p id='info-right'><span>{order['Order Date']}</span></p>
                    </div>
                    <div class='info'>
                        <p id='info-left'><span>Delivery Date</span></p>
                        <p id='info-right'><span>{order['Delivery Date']}</span></p>
                    </div>
                    <div class='info'>
                        <p id='info-left'><span>Delivered</span></p>
                        <p id='info-right'><span>{getStatusSVG(order.Delivered.toString())}</span></p>
                    </div>
                    <div class='info'>
                        <p id='info-left'><span>Signed</span></p>
                        <p id='info-right'><span>{getStatusSVG(order.Signed.toString())}</span></p>
                    </div>
                </div>
                <div class='right-content'>
                    <span>Order Description</span>
                    <img src={fileDownloadIcon} alt="download mp3 file" />
                </div>
            </div>
            <MainButton title='Back' />
        </div>
    )
}


export default OrderDetails;