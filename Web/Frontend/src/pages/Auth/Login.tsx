import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  token?: string;
  message?: string;
}

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password, remember }),
      });

      let data: LoginResponse;
      try {
        data = await response.json();
      } catch {
        data = { message: await response.text() };
      }

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      // Aquí puedes guardar token en contexto o localStorage si quieres
      // localStorage.setItem("token", data.token || "");

      navigate("/", { replace: true }); // Redirige sin recargar
    } catch (err: any) {
      console.log("Error details:", err);
      setError(err.message || "Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "24rem" }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Contraseña */}
          <div className="mb-1">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="form-control"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Mostrar/Ocultar contraseña */}
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label className="form-check-label" htmlFor="showPassword">
              Mostrar contraseña
            </label>
          </div>

          {/* Recordarme */}
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              id="rememberMe"
              className="form-check-input"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Recordarme
            </label>
          </div>

          {/* Botón submit */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>

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
