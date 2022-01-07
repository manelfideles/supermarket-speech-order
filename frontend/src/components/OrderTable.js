import React from 'react'
import '../css/OrderTable.css'
import greenLight from '../assets/greenlight.jpg'
import redLight from '../assets/redlight.jpg'
import axios from 'axios';

class OrderTable extends React.Component {
    constructor(props) {
        super(props);
        // this static 'orders' array will be replaced by API calls
        this.state = { orders: [] };
    }

    getStatusSVG(isDone) {
        return isDone ? <img src={greenLight} alt="true" /> : <img src={redLight} alt="" />
    }

    getRoute(path) {
        let args = Array.prototype.slice.call(arguments, 1);
        let count = -1;
        return path.replace(/:[a-zA-Z?]+/g, function (match) {
            count += 1;
            return args[count] !== undefined ? args[count] : match;
        });
    };

    componentDidMount() {
        axios.get(
            this.getRoute('user/:userId/orders', localStorage.getItem('userId')),
            { headers: { 'Authorization': localStorage.getItem('token') } }
        ).then((res) => {
            if (res.status == 200) {
                this.setState({ orders: res.data });
                //this.setState({ orders: res.data });
            }
        });
    }

    render() {
        let table = Object.entries(this.state.orders).map((order, index) => {
            let key = order[0];
            let value = order[1];
            return (
                <tr key={index} data-item={order}>
                    <td data-title='orderId' class='first'>{key}</td>
                    <td data-title='orderDate'>{value['OrderDate'].slice(0, 10)}</td>
                    <td data-title='deliveryTime'>{value['deliveryTime'].slice(0, 10)}</td>
                    <td data-title='description'><a href={value['mp3Link']} target="_blank">Listen</a></td>
                    <td data-title='orderStatus' class='last'>{this.getStatusSVG(!value['Status'])}</td>
                </tr>
            );
        })
        return (
            <div class='order_table'>
                <table id='orders'>
                    <th key={0}>Order #</th>
                    <th key={1}>Order Date</th>
                    <th key={2}>Delivery Date</th>
                    <th key={3}>Description</th>
                    <th key={4}>Status</th>
                    <tbody>
                        {table}
                    </tbody>
                </table>
            </div>
        )
    }
}


export default OrderTable;