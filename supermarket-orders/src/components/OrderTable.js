import React from 'react'
import '../css/OrderTable.css'
import greenLight from '../assets/greenlight.jpg'
import redLight from '../assets/redlight.jpg'
import { useNavigate } from 'react-router-dom';

class OrderTable extends React.Component {
    constructor(props) {
        super(props);
        // this static 'orders' array will be replaced by API calls
        this.state = {
            orders: [
                {
                    ID: '1234',
                    'Order Date': '2021-12-19',
                    'Delivery Date': '2021-12-22',
                    Delivered: false,
                    Signed: false,
                },
                {
                    ID: '4567',
                    'Order Date': '2021-12-19',
                    'Delivery Date': '2021-12-22',
                    'Delivered': false,
                    'Signed': false,
                },
                {
                    ID: '7890',
                    'Order Date': '2021-12-19',
                    'Delivery Date': '2021-12-22',
                    'Delivered': false,
                    'Signed': false,
                },
                {
                    ID: '1357',
                    'Order Date': '2021-12-19',
                    'Delivery Date': '2021-12-22',
                    'Delivered': false,
                    'Signed': false,
                },
                {
                    ID: '2468',
                    'Order Date': '2021-12-19',
                    'Delivery Date': '2021-12-22',
                    'Delivered': false,
                    'Signed': false,
                },
                {
                    ID: '5791',
                    'Order Date': '2021-12-19',
                    'Delivery Date': '2021-12-22',
                    'Delivered': false,
                    'Signed': false,
                },
            ]
        }
    }

    getStatusSVG(isDone) {
        return isDone ? <img src={greenLight} alt="true" /> : <img src={redLight} alt="" />
    }

    displayTableHeader() {
        let header = Object.keys(this.state.orders[0]).slice(0, -2).concat(['Status']);
        return header.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    }

    displayTableData() {
        return this.state.orders.map((order, index) => {
            return (
                <tr key={index} data-item={order} onClick={() => {
                    console.log(`Order ${order.ID}`);
                    let navigate = useNavigate();
                    navigate('user/orders/:orderId');
                }}>
                    <td data-title='orderId' class='first'>{order.ID}</td>
                    <td data-title='orderDate'>{order['Order Date']}</td>
                    <td data-title='deliveryDate'>{order['Delivery Date']}</td>
                    <td data-title='orderStatus' class='last'>{this.getStatusSVG(order.Delivered && order.Signed)}</td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div class='order_table'>
                <table id='orders'>
                    {this.displayTableHeader()}
                    <tbody>
                        {this.displayTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}


export default OrderTable;