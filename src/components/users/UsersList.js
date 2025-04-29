import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { getUsers, deleteUser } from "../../services/api";
import UserForm from "./UserForm";
import "../users/UserList.css";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); 
  const navigate = useNavigate(); // Hook para la navegación

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  return (
    <div className="userlist-container">
      <h2>Lista de Usuarios</h2>
      <UserForm fetchUsers={fetchUsers} selectedUser={selectedUser} />
      
      <div className="userlist-list">
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
              <div className="userlist-buttons">
                <button onClick={() => setSelectedUser(user)}>Editar</button>
                <button onClick={() => handleDelete(user.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

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

export default UsersList;