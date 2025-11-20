export default function Login() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "24rem" }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <form>
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

          {/* Recordarme */}
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Recordarme
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Iniciar Sesión
          </button>
        </form>

        {/* Opciones adicionales */}
        <div className="text-center mt-3">
          <a href="/RecoverPassword" className="d-block mb-2">
            ¿Olvidaste tu contraseña?
          </a>
          <small>
            ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
          </small>
        </div>
      </div>
    </div>
  );
}
