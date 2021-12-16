import React from 'react'
import '../css/Order.css'
import MainButton from '../components/MainButton';

function Order() {
    return (
        <div class='order'>
            <div>
                <h1>Now you order!</h1>
            </div>
            <form action="" method="post">
                <textarea name="order_text" placeholder='I want...' />
            </form>
            <MainButton href='/' title='Submit' />
        </div>
    )
}

export default Order;