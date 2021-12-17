import React from 'react'
import '../css/RegisterForm.css';
import SubmitButton from '../components/SubmitButton';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        // set 'value' of property 'name'
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        alert(`Credentials: ${this.state.email} ${this.state.password}`)
        event.preventDefault();
    }

    render() {
        return (
            <div class='registercomp'>
                {/* aqui e suposto mudar o tipo de req para get com <method='get'>*/}
                <form class='registerform' onSubmit={this.handleSubmit}>
                    <label>Email</label>
                    <input type="text" name="email" value={this.state.email} onChange={this.handleInputChange} />

                    <label>Password</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                    <SubmitButton active_={!(this.state.email && this.state.password)} title='Sign-up' />
                </form>
            </div>
        )
    }
}


export default RegisterForm;