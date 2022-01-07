import React from 'react';
import OrderForm from '../components/OrderForm';
import '../css/Order.css';

function Order() {
    return (
        <div class='order'>
            <div class='header'>
                <h1>Now you order! 👇</h1>
            </div>
            <OrderForm />
        </div>
    )
}

export default Order;