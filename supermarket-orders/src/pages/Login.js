import React from 'react'
import '../css/Login.css'
import MainButton from '../components/MainButton'

function Login() {
    return (
        <div class='login'>
            <h1>Login now!</h1>
            <form class="loginform" action="" method="post">
                <label for="email">Email</label>
                <input type="text" id="email" name="email" />
                <label for="password">Password</label>
                <input type="text" id="password" name="password" />
            </form>
            <MainButton href='/' title='Login' />
            <div>
                <span>
                    Still don't have an account?
                    <a href="/register">Sign-up here.</a>
                </span>
            </div>
        </div>
    )
}

export default Login;