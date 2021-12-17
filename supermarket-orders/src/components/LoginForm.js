import React from 'react'
import '../css/LoginForm.css';
import SubmitButton from '../components/SubmitButton';

function LoginForm() {
    return (
        <div class='logincomp'>
            <form class="loginform" action="" method="get">
                <label for="email">Email</label>
                <input type="text" id="email" name="email" />
                <label for="password">Password</label>
                <input type="text" id="password" name="password" />
                <SubmitButton title='Login' />
            </form>
        </div>
    )
}

export default LoginForm;