import './App.css';
import ResponsiveAppBar from './Components/AppBar/AppBar';
import SignUp from './Components/SignUp/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from './Components/Login/Login';
import LandingPage from './Components/LandingPage/LandingPage';
import HomePage from './Components/HomePage/HomePage';
import Dashboard from './Components/AdminPanel/Dashboard';
import AddProduct from './Components/AdminPanel/Products/AddProduct';
import Orders from './Components/AdminPanel/Orders';
import ShopingCart from './Components/ShopingCart/ShopingCart';
import TotalEarning from './Components/AdminPanel/TotalEarning';
import Protected from './Protected';
function App() {
  const getId = localStorage.getItem('userId');

  return (
    <div className="App">
      <BrowserRouter>
        {/* <ResponsiveAppBar /> */}
        <Routes>
          <Route path='/login' element={<><Protected Cmp={Login} /></>} />
          <Route path='/signup' element={<><Protected Cmp={SignUp} /></>} />
          {/* <Route path="/home" element={<><Protected Cmp={HomePage} /></>} /> */}
          <Route path="/admindashboard" element={<><Protected Cmp={Dashboard} /></>} />
          <Route path="/create-product" element={<><Protected Cmp={AddProduct} /></>} />
          <Route path="/order/details" element={<><Protected Cmp={Orders} /></>} />
          <Route path="/total/earining" element={<><Protected Cmp={TotalEarning} /></>} />
          <Route path="/cart-product" element={<><Protected Cmp={ShopingCart} /></>} />
          <Route path='/' element={<><Protected Cmp={HomePage} /></>} />
          {/* <Route path="*" element={<Navigate to={(getId != 1 && getId != null) ? "/home" : "/admindashboard"} />} /> */}
          {/* <Route path="*" element={<Navigate to={getId == 1 ? "/admindashboard" : "/"} />} /> */}

        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
