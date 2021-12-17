import React from 'react'
import '../css/RegisterForm.css';
import SubmitButton from '../components/SubmitButton';

function RegisterForm() {
    return (
        <div class='registercomp'>
            <form class="registerform" action="" method="post">
                <label for="email">Email</label>
                <input type="text" id="email" name="email" />
                <label for="password">Password</label>
                <input type="text" id="password" name="password" />
                <SubmitButton title='Sign-up' />
            </form>
        </div>
    )
}

export default RegisterForm;