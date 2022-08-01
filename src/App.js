import './App.css';
import ResponsiveAppBar from './Components/AppBar/AppBar';
import SignUp from './Components/SignUp/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Login from './Components/Login/Login';
import LandingPage from './Components/LandingPage/LandingPage';
import HomePage from './Components/HomePage/HomePage';
import Dashboard from './Components/AdminPanel/Dashboard';
import AddProduct from './Components/AdminPanel/Products/AddProduct';
import Update from './Components/AdminPanel/Products/Update';
import Orders from './Components/AdminPanel/Orders';
import React, { useState } from 'react';
import axios from 'axios';
import { AppBar } from '@mui/material';
import ShopingCart from './Components/ShopingCart/ShopingCart';
import TotalEarning from './Components/AdminPanel/TotalEarning';
import Protected from './Protected';
function App() {
  const [isAdmin, setIsAdmin] = useState(1)
  const [isUser, setIsUser] = useState(null);
  const [user, setUser] = React.useState(null);
  const [isLoggedIn, setisLoggedIn] = useState(null);
  const logIn = () => {
    setisLoggedIn(true);
  };
  const logOut = () => {
    setisLoggedIn(false);
  };
  const onSubmit = async (formData) => {
    const user = await axios
      .get("http://localhost:8000/users")
      .then((res) => checkEmail(res.data, formData));
    console.log('appppp', user.id);
    setUser(user)
  };
  const checkEmail = (serverUsers, formData) => {
    const user = serverUsers.find(user => user.id != null); // extract the email from the formData
    if (user) {
      console.log('ifff', user);
    };
  };
  const getAddToCart = async () => {
    const response = await axios.get(
      'http://localhost:8000/cart/');

    console.log(response.data);
  };

  React.useEffect(() => {
    onSubmit();
    getAddToCart();
  }, [])
  return (
    <div className="App">
      {/* {isLoggedIn ? (
        <button onClick={logOut}>Logout</button>
      ) : (
        <button onClick={logIn}>Login</button>
      )} */}
      <BrowserRouter>
        <ResponsiveAppBar getAddToCart={getAddToCart} />

        <Routes>

          {/* <Route path='/' element={<LandingPage />} /> */}
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path="/home" element={<><Protected Cmp={HomePage} /></>} />
          <Route path="/admindashboard" element={<><Protected Cmp={Dashboard} /></>} />
          <Route path="/create-product" element={<><Protected Cmp={AddProduct} /></>} />
          <Route path="/order/details" element={<><Protected Cmp={Orders} /></>} />
          <Route path="/total/earining" element={<><Protected Cmp={TotalEarning} /></>} />
          <Route path="/cart-product" element={<><Protected Cmp={ShopingCart} /></>} />

          <Route path='/landing' element={<LandingPage />} />

          {/* <Route path='/admindashboard' element={<Dashboard />} /> */}
          {/* <Route path='/create-product' element={<AddProduct />} /> */}
          <Route path='/update/:id' element={<Update />} />
          {/* <Route path='/order/details' element={<Orders />} /> */}
          {/* <Route path='/total/earining' element={<TotalEarning />} /> */}
          {/* <Route path='/cart-product' element={<ShopingCart />} /> */}
          <Route path="*" element={<Navigate to={"/"} />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
