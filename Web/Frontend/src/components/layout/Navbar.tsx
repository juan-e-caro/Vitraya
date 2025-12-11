import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  role: "Client" | "Vendor" | "Admin";
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token) {
      await fetch("/api/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    setUser(null);
    navigate("/");
  };

  const leftButtonStyle = "btn btn-light text-primary rounded-pill me-2 d-flex align-items-center";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow py-4">
      <div className="container-fluid">

        {/* LOGO */}
        <Link className="navbar-brand fw-bold fs-3 text-light" to="/">
          Vitraya
        </Link>

        {/* TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAVBAR CONTENT */}
        <div className="collapse navbar-collapse" id="navbarNav">
          
          {/* LEFT SIDE LINKS AS BUTTONS */}
          <div className="d-flex me-auto">
            {/* Inicio: visible para todos */}
            <Link className={leftButtonStyle} to="/">
              <i className="bi bi-house-door me-1"></i> Inicio
            </Link>

            {/* Admin */}
            {user?.role === "Admin" && (
              <>
                <Link className={leftButtonStyle} to="/admin/products">
                  <i className="bi bi-box-seam me-1"></i> Productos (Admin)
                </Link>
                <Link className={leftButtonStyle} to="/admin/users">
                  <i className="bi bi-people me-1"></i> Usuarios
                </Link>
              </>
            )}

            {/* Vendor */}
            {user?.role === "Vendor" && (
              <Link className={leftButtonStyle} to="/vendor/products">
                <i className="bi bi-bag me-1"></i> Mis Productos
              </Link>
            )}

            {/* Client */}
            {user?.role === "Client" && (
              <>
                <Link className={leftButtonStyle} to="/products">
                  <i className="bi bi-box me-1"></i> Productos
                </Link>
                <Link className={leftButtonStyle} to="/cart">
                  <i className="bi bi-cart me-1"></i> Carrito
                </Link>
              </>
            )}
          </div>

          {/* SEARCH BAR */}
          <form className="d-flex me-3" style={{ width: "250px" }}>
            <input
              className="form-control rounded-pill px-3"
              type="search"
              placeholder="Buscar productos..."
            />
          </form>

          {/* RIGHT SIDE (ACCOUNT) */}
          <div className="d-flex align-items-center gap-2">

            {user ? (
              <>
                <Link
                  className="btn btn-outline-light rounded-pill d-flex align-items-center"
                  to="/profile"
                >
                  <i className="bi bi-person-circle me-1"></i> {user.name}
                </Link>

                <button
                  className="btn btn-outline-light rounded-pill d-flex align-items-center"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-1"></i> Salir
                </button>
              </>
            ) : (
              <>
                <Link
                  className="btn btn-outline-light rounded-pill d-flex align-items-center"
                  to="/login"
                >
                  <i className="bi bi-box-arrow-in-right me-1"></i> Iniciar Sesión
                </Link>
                <Link
                  className="btn btn-outline-light rounded-pill d-flex align-items-center"
                  to="/register"
                >
                  <i className="bi bi-person-plus me-1"></i> Registrarse
                </Link>
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}
