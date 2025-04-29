import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { createCategory } from "../../services/api";
import "../categories/CategoryForm.css";

const CategoryForm = ({ fetchCategories }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const navigate = useNavigate(); // Hook para manejar la navegación

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategory(form);
      alert("Categoría creada exitosamente.");
      if (typeof fetchCategories === "function") {
        fetchCategories();
      }
      setForm({ name: "", description: "" });
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      if (error.response) {
        alert(
          `Error: ${
            error.response.data.msg || "No se pudo completar la operación."
          }`
        );
      } else {
        alert("Ocurrió un error inesperado.");
      }
    }
  };

  return (
    <div className="category-form-container">
      <form className="category-form" onSubmit={handleSubmit}>
        <h2>Crear Categoría</h2>
        <input
          name="name"
          placeholder="Nombre de la Categoría"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
          required
        />
        <button type="submit">Crear</button>
        {/* Botón para regresar a opciones */}
      <button
        onClick={() => navigate("/options")}
        style={{
          marginTop: "1rem",
          padding: "0.8rem",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Regresar a Opciones
      </button>
      </form>

      
    </div>
  );
};

export default CategoryForm;