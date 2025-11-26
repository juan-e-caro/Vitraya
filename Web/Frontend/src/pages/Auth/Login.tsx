import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // 👈 agregar esto

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ email, password, remember }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Credenciales incorrectas");
        return;
      }

      console.log("Login exitoso:", data);

      // Guardar token (usa remember)
      if (remember) {
        localStorage.setItem("token", data.access_token);
      } else {
        sessionStorage.setItem("token", data.access_token);
      }

      // Guardar usuario
      localStorage.setItem("user", JSON.stringify(data.user));

      // 🔥 REDIRECCIÓN AL HOME
      navigate("/");   // 👈 AQUÍ ESTA LA MAGIA

    } catch (error: any) {
      setErrorMessage("Error de conexión con el servidor");
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>

        {/* Mensaje de error */}
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
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
              autoComplete="email"
              required
            />
          </div>

          {/* Password */}
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
              autoComplete="current-password"
              required
            />
          </div>

          {/* Mostrar Contraseña */}
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

          {/* Botón */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>

        </form>

        {/* Enlaces */}
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
