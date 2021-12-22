import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/base.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Order from './pages/Order';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import UserOrders from './pages/UserOrders';
import OrderDetails from './pages/OrderDetails';
import axios from 'axios';

function App() {
  // axios.defaults.baseURL = "<link do EB>";
  axios.defaults.baseURL = "http://localhost:8000";
  // axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*'

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/order/:userId' element={<Order />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/user/:userId/orders' element={<UserOrders />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
