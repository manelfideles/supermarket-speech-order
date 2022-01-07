import React from 'react'
import '../css/LoginForm.css';
import SubmitButton from '../components/SubmitButton';
import axios from 'axios';
import qs from 'qs';
import { Navigate } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 'userId': '', 'password': '', redirect: false };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        // set 'value' of property 'name'
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(`Credentials: ${this.state.userId}, ${this.state.password}`);
        axios.post(
            '/login/',
            qs.stringify({ userId: this.state.userId, password: this.state.password }),
        )
            .then((res) => {
                if (res.status == 200) {
                    let tokenVal = res.data['token']
                    localStorage.setItem('token', tokenVal)
                    localStorage.setItem('userId', this.state.userId);
                    document.cookie = `token=${tokenVal};`
                    this.setState({ redirect: true });
                }
            })
            .catch((error) => { console.log(error); });
    }

    render() {
        if (this.state.redirect) { return (<Navigate to='/' />) }
        else {
            return (
                <div class='logincomp' >
                    <form class="loginform" onSubmit={this.handleSubmit}>
                        <label for="userId">User Id</label>
                        <input type="text" id="userId" name="userId" value={this.state.userId} onChange={this.handleInputChange} />
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                        <SubmitButton active_={!(this.state.userId && this.state.password)} title='Login' />
                    </form>
                </div>
            )
        }
    }
}

export default LoginForm;