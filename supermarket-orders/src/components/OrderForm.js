import React from 'react'
import '../css/OrderForm.css'
import SubmitButton from '../components/SubmitButton'

function OrderForm() {
    return (
        <div class='orderform'>
            <form action="" method="post">
                <textarea name="order_text" placeholder='I want...' />
                <SubmitButton title='Order' />
            </form>
        </div>
    )
}

export default OrderForm;