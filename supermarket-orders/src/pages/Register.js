import React from 'react';
import RegisterForm from '../components/RegisterForm';
import '../css/Register.css'


function Register() {
    return (
        <div class='register'>
            <h1>Sign-up</h1>
            <RegisterForm />
            <div class='loginhere'>
                <span>
                    Already have an account?
                    <a href="/login">Login here.</a>
                </span>
            </div>
        </div>
    )
}

export default Register;