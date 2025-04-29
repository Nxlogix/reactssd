import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../services/api";
import "../products/Product.css";

const ProductForm = ({ fetchProducts }) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category_id: "",
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(form);
      alert("Producto creado exitosamente.");
      if (typeof fetchProducts === "function") {
        fetchProducts();
      }
      setForm({ name: "", price: "", stock: "", category_id: "" });
    } catch (error) {
      console.error("Error al crear el producto:", error);
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
    <div className="product-form-container">
      <form onSubmit={handleSubmit} className="product-form">
        <h2>Crear Producto</h2>
        <input
          name="name"
          placeholder="Nombre del Producto"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          placeholder="Precio"
          type="number"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          name="stock"
          placeholder="Stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          required
        />
        <input
          name="category_id"
          placeholder="ID de la Categoría"
          type="number"
          value={form.category_id}
          onChange={handleChange}
          required
        />
        <button type="submit">Crear Producto</button>
        
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

export default ProductForm;