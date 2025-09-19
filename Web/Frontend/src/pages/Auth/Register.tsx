export default function Register() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "26rem" }}>
        <h2 className="text-center mb-4">Crear Cuenta</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nombre completo
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Juan Pérez"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="ejemplo@correo.com"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="********"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmar contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="********"
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Registrarse
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
          </small>
        </div>
      </div>
    </div>
  );
}
