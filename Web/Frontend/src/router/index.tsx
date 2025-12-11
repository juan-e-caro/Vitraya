import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Products from "../pages/Products/Products";
import Cart from "../pages/Cart/Cart";
import AdminProducts from "../pages/Admin/AdminProducts";
import AdminUsers from "../pages/Admin/AdminUsers";
import PasswordReset from "../pages/Auth/RecoverPassword";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/Profile/EditProfile";
import ProductVendor from "../pages/Vendor/VendorProducts";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/RecoverPassword" element={<PasswordReset />} />
      <Route path="/Profile" element={<Profile/>}/>
      <Route path="/EditProfile" element={<EditProfile/>}/>

      {/* 🔥 Admin routes only for admin */}
      <Route
        path="/admin/products"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminProducts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminUsers />
          </ProtectedRoute>
        }
      />

      {/* 🔹 Vendor route only for vendor */}
      <Route
        path="/vendor/products"
        element={
          <ProtectedRoute allowedRoles={["Vendor"]}>
            <ProductVendor />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
