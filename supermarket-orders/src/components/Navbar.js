import { React, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../css/Navbar.css';
import logo from '../assets/logo.svg';

/*
localStorage.removeItem('token');
return <Navigate to='/' />;
*/


function Navbar() {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token') != null);

    function doLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setLoggedIn(false);
        window.location.reload(false);
        <Navigate to='/' />
    }

    function getRoute(path) {
        let args = Array.prototype.slice.call(arguments, 1);
        let count = -1;
        return path.replace(/:[a-zA-Z?]+/g, function (match) {
            count += 1;
            return args[count] !== undefined ? args[count] : match;
        });
    };

    if (loggedIn !== false) {
        return (
            <nav>
                <li>
                    <Link to='/'><img src={logo} alt="logo" /></Link>
                </li>
                <ul>
                    <li><Link to={getRoute('/order/:userId', localStorage.getItem('userId'))}>Order</Link></li>
                    <li><Link to='/' onClick={doLogout}>Logout</Link></li>
                    <li><Link to={getRoute('/user/:userId/orders', localStorage.getItem('userId'))}>My Orders</Link></li>
                </ul>
            </nav>
        );
    }
    else return (
        <nav>
            <li>
                <Link to='/'><img src={logo} alt="logo" /></Link>
            </li>
            <ul>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/register'>Register</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;