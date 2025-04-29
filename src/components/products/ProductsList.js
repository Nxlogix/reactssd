import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { getProducts, deleteProduct, updateProduct } from "../../services/api";
import "../products/Product.css";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null); 
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const navigate = useNavigate(); // Hook para la navegación

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await getProducts();
    setProducts(response.data);
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  const handleEditClick = (product) => {
    setEditProduct(product); 
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await updateProduct(editProduct.id, formData); 
    fetchProducts(); 
    setEditProduct(null); 
  };

  return (
    <div className="products-list-container">
      <h2>Lista de Productos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price} - Stock: {product.stock}
            <button onClick={() => handleDelete(product.id)}>Eliminar</button>
            <button onClick={() => handleEditClick(product)}>Editar</button>
          </li>
        ))}
      </ul>

      {editProduct && (
        <div className="edit-product-form">
          <h3>Editar Producto</h3>
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              placeholder="Nombre del Producto"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleFormChange}
              placeholder="Precio"
            />
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleFormChange}
              placeholder="Stock"
            />
            <button type="submit">Guardar Cambios</button>
            <button type="button" onClick={() => setEditProduct(null)}>
              Cancelar
            </button>
          </form>
        </div>
      )}

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
    </div>
  );
};

export default ProductsList;