import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function EditProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetch("/api/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        setFormData({ name: data.user.name, email: data.user.email });
      })
      .catch(() => setError("No se pudo cargar la información"))
      .finally(() => setLoading(false));
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!user) return;
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/UpdateUser/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al actualizar los datos");
        return;
      }

      localStorage.setItem("user", JSON.stringify({ ...user, ...formData }));
      setSuccess("Datos actualizados correctamente");

      // Redirige al perfil
      navigate("/profile");
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

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-lg p-4 rounded-4" style={{ width: "420px" }}>
        <h2 className="text-center mb-4">Editar Perfil</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-person me-1"></i> Nombre
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            <i className="bi bi-envelope me-1"></i> Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-flex justify-content-between">
          <button className="btn btn-success w-50 me-2" onClick={handleUpdate}>
            <i className="bi bi-check-lg me-1"></i> Guardar
          </button>
          <button
            className="btn btn-secondary w-50 ms-2"
            onClick={() => navigate("/profile")}
          >
            <i className="bi bi-x-lg me-1"></i> Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
