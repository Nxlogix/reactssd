import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import UsersList from "./components/users/UsersList";
import ProductsList from "./components/products/ProductsList";
import ProductForm from "./components/products/ProductForm";
import CategoryForm from "./components/categories/CategoryForm";
import UserForm from "./components/users/UserForm";
import Options from "./components/Options";

function App() {
  return (
    <Router>
      <Routes>
          {/* Ruta principal :) */}
        <Route path="/" element={<Navigate to="/users/form" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/form" element={<ProductForm />} />
        <Route path="/options" element={<Options />} />
        <Route path="/categories" element={<CategoryForm />} />
        <Route path="/users/form" element={<UserForm />} />
      </Routes>
    </Router>
  );
}

export default App;