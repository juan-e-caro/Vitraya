export default function AdminUsers() {
  return (
    <div>
      <h1>Gestión de Usuarios</h1>
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Juan Pérez</td>
            <td>juan@example.com</td>
            <td>Cliente</td>
            <td>
              <button>Editar Rol</button>
              <button>Eliminar</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Admin Demo</td>
            <td>admin@example.com</td>
            <td>Admin</td>
            <td>
              <button>Editar Rol</button>
              <button>Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
