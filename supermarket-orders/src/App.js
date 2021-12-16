import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/base.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Order from './pages/Order';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/order' element={<Order />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
