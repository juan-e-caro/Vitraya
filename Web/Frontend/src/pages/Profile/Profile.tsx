import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetch("/api/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(() => setError("No se pudo cargar la información"))
      .finally(() => setLoading(false));
  }, [token]);

  const handleDelete = async () => {
    if (!user) return;
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer."
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/DeleteUser/${user.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        setError("No se pudo eliminar la cuenta");
        return;
      }

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      setError("Error de conexión");
    }
  };

  if (loading)
    return <div className="text-center mt-5">Cargando perfil...</div>;
  if (!user)
    return (
      <div className="text-center mt-5">No hay información del usuario</div>
    );

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const roleBadgeColor =
    user.role === "Admin"
      ? "danger"
      : user.role === "Vendor"
      ? "warning text-dark"
      : "primary";

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4 rounded-4" style={{ width: "420px" }}>
        {/* Avatar */}
        <div className="d-flex justify-content-center mb-3">
          <div
            className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "100px", height: "100px", fontSize: "2rem" }}
          >
            {initials}
          </div>
        </div>

        <h2 className="text-center mb-3">{user.name}</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <ul className="list-group mb-4">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <i className="bi bi-person me-2"></i> Nombre
            </span>
            {user.name}
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <i className="bi bi-envelope me-2"></i> Correo
            </span>
            {user.email}
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <i className="bi bi-shield-lock me-2"></i> Rol
            </span>
            <span className={`badge bg-${roleBadgeColor}`}>{user.role}</span>
          </li>
        </ul>

        <div className="d-flex justify-content-between">
          <Link to="/EditProfile" className="btn btn-primary w-50 me-2">
            <i className="bi bi-pencil-square me-1"></i> Editar
          </Link>
          <button
            className="btn btn-danger w-50 ms-2"
            onClick={handleDelete}
          >
            <i className="bi bi-trash3 me-1"></i> Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
