import React from 'react'
import '../css/OrderForm.css'
import SubmitButton from '../components/SubmitButton'

class OrderForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // permite que o texto atualize e apareca no ecra
    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    // guarda o text que esta escrito no ecra
    handleSubmit(event) {
        // o POST request faz-se aqui 👇
        alert('Order was sent: ' + this.state.value);
        event.preventDefault();
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