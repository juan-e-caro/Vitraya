import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Verificar si hay sesión activa
  useEffect(() => {
    fetch("/api/user", {
      credentials: "include", // necesario para Sanctum
    })
      .then((res) => {
        if (!res.ok) throw new Error("No authenticated");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  // Función de logout
  const handleLogout = async () => {
    await fetch("/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    navigate("/"); // redirige a home después de cerrar sesión
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold">Vitraya</span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="bi bi-house"></i> Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                <i className="bi bi-grid"></i> Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <i className="bi bi-cart"></i> Carrito
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            {user ? (
              <>
                <Link className="btn btn-secondary me-2" to="/profile">
                  <i className="bi bi-person-circle"></i> Perfil
                </Link>
                <button
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right"></i> Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-light me-2" to="/login">
                  <i className="bi bi-box-arrow-in-right"></i> Iniciar Sesión
                </Link>
                <Link className="btn btn-primary" to="/register">
                  <i className="bi bi-person-plus"></i> Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
