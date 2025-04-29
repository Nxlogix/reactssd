import React from "react";
import { useNavigate } from "react-router-dom";
import "./Options.css";

const Options = () => {
  const navigate = useNavigate();

  return (
    <div className="options-container">
      <h2>Opciones</h2>
      <div className="options-buttons">
        <button onClick={() => navigate("/users")}>Usuarios</button>
        <button onClick={() => navigate("/products")}>Productos</button>
        <button onClick={() => navigate("/categories")}>Categorías</button>
        <button onClick={() => navigate("/products/form")}>Crear Producto</button>
      </div>
    </div>
  );
};

export default Options;
