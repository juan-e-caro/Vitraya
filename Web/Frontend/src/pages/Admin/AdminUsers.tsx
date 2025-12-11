import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [newRole, setNewRole] = useState("");

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  // --------------------------
  //   Obtener usuarios
  // --------------------------
  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/ListUser", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Error al obtener usuarios");

      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError("No se pudieron cargar los usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // --------------------------
  //   Eliminar usuario
  // --------------------------
  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar este usuario?")) return;

    try {
      const res = await fetch(
        `http://localhost:8000/api/DeleteUser/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Error al eliminar el usuario");

      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      alert("No se pudo eliminar al usuario");
    }
  };

  // --------------------------
  //   Abrir edición de rol
  // --------------------------
  const startEdit = (user: User) => {
    setEditingUserId(user.id);
    setNewRole(user.role);
  };

  // --------------------------
  //   Guardar nuevo rol
  // --------------------------
  const saveRole = async (id: number) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/UpdateUser/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ role: newRole }),
        }
      );

      if (!res.ok) throw new Error("Error actualizando el rol");

      setUsers((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, role: newRole } : u
        )
      );

      setEditingUserId(null);
    } catch (err) {
      alert("No se pudo actualizar el rol");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-body">
          <h2 className="fw-bold mb-4 text-center">Gestión de Usuarios</h2>

          {loading && <p className="text-center">Cargando usuarios...</p>}
          {error && <p className="text-danger text-center">{error}</p>}

          {!loading && !error && (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Rol</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        {editingUserId === user.id ? (
                          <select
                            className="form-select form-select-sm"
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                          >
                            <option value="Admin">Admin</option>
                            <option value="Vendor">Vendor</option>
                            <option value="Client">Client</option>
                          </select>
                        ) : (
                          <span
                            className={
                              "badge " +
                              (user.role === "Admin"
                                ? "bg-danger"
                                : user.role === "Vendor"
                                ? "bg-warning text-dark"
                                : "bg-primary")
                            }
                          >
                            {user.role}
                          </span>
                        )}
                      </td>

                      <td className="text-center">
                        {editingUserId === user.id ? (
                          <>
                            <button
                              className="btn btn-sm btn-success me-2"
                              onClick={() => saveRole(user.id)}
                            >
                              Guardar
                            </button>
                            <button
                              className="btn btn-sm btn-secondary"
                              onClick={() => setEditingUserId(null)}
                            >
                              Cancelar
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="btn btn-sm btn-warning me-2"
                              onClick={() => startEdit(user)}
                            >
                              <i className="bi bi-pencil-square"></i> Editar
                            </button>

                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDelete(user.id)}
                            >
                              <i className="bi bi-trash3"></i> Eliminar
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
