import {Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Products from "../pages/Products/Products";
import Cart from "../pages/Cart/Cart";
import AdminProducts from "../pages/Admin/AdminProducts";
import AdminUsers from "../pages/Admin/AdminUsers";
import PasswordReset from "../pages/Auth/RecoverPassword";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/RecoverPassword" element={<PasswordReset/>}/>
    </Routes>
  );
}
