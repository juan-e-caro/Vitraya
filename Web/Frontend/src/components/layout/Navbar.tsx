import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Nombre de la tienda (no clickeable) */}
        <span className="navbar-brand fw-bold">Vitraya</span>

        {/* Botón hamburguesa (móvil) */}
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

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Productos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Carrito
              </Link>
            </li>
          </ul>

          {/* Botones a la derecha */}
          <div className="d-flex">
            <Link className="btn btn-outline-light me-2" to="/login">
              Iniciar Sesión
            </Link>
            <Link className="btn btn-primary" to="/register">
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
