import React from 'react'
import '../css/OrderForm.css'
import SubmitButton from '../components/SubmitButton'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


class OrderForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // permite que o texto atualize e apareca no ecra
    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    getRoute(path) {
        let args = Array.prototype.slice.call(arguments, 1);
        let count = -1;
        return path.replace(/:[a-zA-Z?]+/g, function (match) {
            count += 1;
            return args[count] !== undefined ? args[count] : match;
        });
    };

    // guarda o text que esta escrito no ecra
    handleSubmit(event) {
        // o POST request faz-se aqui 👇
        event.preventDefault();
        console.log(this.state.value);
        var order = new FormData();
        order.append('order', this.state.value);
        axios.post(
            this.getRoute(
                'order/:userId',
                localStorage.getItem('userId')
            ), order,
            { headers: { 'Authorization': localStorage.getItem('token') } },
        ).then((res) => {
            if (res.status == 200) { /* this.state = res.data */ console.log(res.data); }
        }).catch((error) => { console.log(error); });
        alert('Order was sent: ' + this.state.value);
    }

    render() {
        return (
            <div class='orderform'>
                {/* aqui e suposto mudar o tipo de req para post com <method='post'>*/}
                <form onSubmit={this.handleSubmit}>
                    <textarea name="order_text" placeholder='I want...' value={this.state.value} onChange={this.handleChange} />
                    <SubmitButton title='Order' />
                </form>
            </div>
        )
    }
}

export default OrderForm;