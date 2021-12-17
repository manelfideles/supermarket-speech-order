import React from 'react'
import '../css/Login.css'
import LoginForm from '../components/LoginForm';

function Login() {
    return (
        <div class='login'>
            <h1>Login now!</h1>
            <LoginForm />
            <div class='registerhere'>
                <span>
                    Still don't have an account?
                    <a href="/register">Sign-up here.</a>
                </span>
            </div>
        </div>
    )
}

export default Login;