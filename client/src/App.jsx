import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterUser from "./pages/RegisterUser";
import LoginUser from "./pages/LoginUser";
import Navbar from "./components/Navbar";
import ContactUs from "./pages/ContactUs";
import Page404 from "./pages/Page404";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Footer from "./components/Footer";
import LogoutPage from "./pages/LogoutPage";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import PurchaseProducts from "./pages/PurchaseProducts";
import CartDetails from "./pages/CartDetails";
import EditProfile from "./pages/EditProfile";
import UpdateCartProduct from "./pages/UpdateCartProduct";
import UpdatePurchaseProduct from "./pages/UpdatePurchaseProduct";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";
import Register from "./admin/Register";
import VerifyEmail from "./pages/VerifyEmail";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/admin-register" element={<Register />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/login" element={<LoginUser />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/service" element={<Services />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/purchase" element={<PurchaseProducts />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/product-details/:id" element={<ProductDetails />} />
            <Route path="/product-cart/:id" element={<CartDetails />} />
            <Route
              path="/update-cart-product/:id"
              element={<UpdateCartProduct />}
            />
            <Route
              path="/update-purchase/:id"
              element={<UpdatePurchaseProduct />}
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/edit-profile/:id" element={<EditProfile />} />
            <Route path="/change-password/:id" element={<ChangePassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
