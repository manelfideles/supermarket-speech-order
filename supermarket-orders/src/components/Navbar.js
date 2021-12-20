import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import logo from '../assets/logo.svg';


function Navbar() {
    return (
        <nav>
            <li>
                <Link to='/'><img src={logo} alt="logo" /></Link>
            </li>
            <ul>
                <li><Link to='/order'>Order</Link></li>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/register'>Register</Link></li>
                <li><Link to='/user/orders'>My Orders</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;