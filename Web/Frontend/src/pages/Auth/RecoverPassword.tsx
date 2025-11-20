export default function RecoverPassword() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "24rem" }}>
        <h2 className="text-center mb-4">Recuperar Contraseña</h2>

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

          <button type="submit" className="btn btn-primary w-100">
            Enviar enlace de recuperación
          </button>
        </form>

        <div className="text-center mt-3">
          <a href="/login" className="d-block mb-2">
            Volver al inicio de sesión
          </a>
        </div>
      </div>
    </div>
  );
}
