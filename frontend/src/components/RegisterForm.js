import React from 'react'
import '../css/RegisterForm.css';
import SubmitButton from '../components/SubmitButton';
import axios from 'axios';
import qs from 'qs';
import { Navigate } from 'react-router-dom';


class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 'userId': '', 'email': '', 'password': '', redirect: false };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        // set 'value' of property 'name'
        this.setState({ [event.target.name]: event.target.value });
    }

    /* handleSubmit(event) {
        alert(`Credentials: ${this.state.email} ${this.state.password}`)
        event.preventDefault();
    } */
    handleSubmit(event) {
        event.preventDefault();
        console.log(`Credentials: ${this.state.email},${this.state.userId}, ${this.state.password}`);
        axios.post(
            '/register/',
            qs.stringify({ userId: this.state.userId, email: this.state.email, password: this.state.password }),
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
        return (
            <div class='registercomp'>
                <form class='registerform' onSubmit={this.handleSubmit}>
                    <label>Email</label>
                    <input type="text" name="email" value={this.state.email} onChange={this.handleInputChange} />

                    <label>User ID</label>
                    <input type="text" name="userId" value={this.state.userId} onChange={this.handleInputChange} />

                    <label>Password</label>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                    <SubmitButton active_={!(this.state.email && this.state.password && this.state.userId)} title='Sign-up' />
                </form>
            </div>
        )
    }
}


export default RegisterForm;