import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/usuarios');
        setUsers(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    if (isLoggedIn) {
      fetchUsers();
    }
  }, [isLoggedIn]);

  return (
    <div>
      <h2>Lista de Usuários</h2>
      {isLoggedIn ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      ) : (
        <p>Você precisa estar logado para ver a lista de usuários.</p>
      )}
    </div>
  );
};

export default UserList;
