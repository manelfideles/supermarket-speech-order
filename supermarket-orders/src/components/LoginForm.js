import React from 'react'
import '../css/LoginForm.css';
import SubmitButton from '../components/SubmitButton';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        return this.email.length > 0 && this.password.length > 0;
    }

    handleInputChange(event) {
        // set 'value' of property 'name'
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        alert(`Credentials: ${this.state.email}, ${this.state.password}`)
        event.preventDefault();
    }

    render() {
        return (
            <div class='logincomp' >
                <form class="loginform" onSubmit={this.handleSubmit} method="get">
                    <label for="email">Email</label>
                    <input type="text" id="email" name="email" value={this.state.email} onChange={this.handleInputChange} />
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                    <SubmitButton title='Login' />
                </form>
            </div>
        )
    }
}

export default LoginForm;