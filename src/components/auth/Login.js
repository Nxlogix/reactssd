import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { loginUser } from "../../services/api";
import "./Login.css"; // Ruta ajustada

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook para manejar la navegación

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(form);
      const { access_token } = response.data;
      localStorage.setItem("token", access_token); // Guardar el token en localStorage
      alert("Login exitoso");
      navigate("/options"); // Navegar a la página de opciones
    } catch (error) {
      setError("Credenciales inválidas");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>
        {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}
        <input
          name="email"
          placeholder="Correo"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          placeholder="Contraseña"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" style={styles.button}>
          Entrar
        </button>
        <button
          onClick={() => navigate("/users/form")} // Botón para navegar al formulario de usuarios
          style={styles.buttonAlt}
        >
          Ir al Formulario de Usuario
        </button>
      </form>
    </div>
  );
};

const styles = {
  button: {
    marginTop: "1rem",
    padding: "0.8rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  buttonAlt: {
    marginTop: "1rem",
    padding: "0.8rem",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Login;