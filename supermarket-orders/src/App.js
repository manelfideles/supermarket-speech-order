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


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/order' element={<Order />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/user/orders' element={<UserOrders />} />
        <Route path='/user/orders/:orderId' element={<OrderDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
