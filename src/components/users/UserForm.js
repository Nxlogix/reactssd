import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import { createUser, updateUser } from "../../services/api";
import "../auth/Login.css";

const UserForm = ({ fetchUsers, selectedUser }) => {
  const [form, setForm] = useState({
    name: selectedUser?.name || "",
    email: selectedUser?.email || "",
    password: "",
  });

  const navigate = useNavigate(); // Hook para manejar la navegación

  useEffect(() => {
    if (selectedUser) {
      setForm({
        name: selectedUser.name,
        email: selectedUser.email,
        password: "",
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedUser) {
        await updateUser(selectedUser.id, form);
        alert("Usuario actualizado exitosamente.");
      } else {
        await createUser(form);
        alert("Usuario creado exitosamente.");
      }
      fetchUsers();
      setForm({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Ocurrió un error. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{selectedUser ? "Actualizar Usuario" : "Crear Usuario"}</h2>
        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Correo"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        {!selectedUser && (
          <input
            name="password"
            placeholder="Contraseña"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        )}
        <button type="submit">{selectedUser ? "Actualizar" : "Crear"}</button>
        <button
        onClick={() => navigate("/login")}
        style={{
          marginTop: "1rem",
          padding: "0.8rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Regresar al Login
      </button>
      </form>

    </div>
  );
};

export default UserForm;