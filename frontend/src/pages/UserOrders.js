import React from 'react';
import '../css/UserOrders.css';
import OrderTable from '../components/OrderTable';

function UserOrders() {
    return (
        <div class='user_orders'>
            <h1>My Orders</h1>
            <OrderTable />
        </div>
    )
}

export default UserOrders;