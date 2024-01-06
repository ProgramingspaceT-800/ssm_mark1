import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import UserList from './UserList';
import ChamadoList from './ChamadoList';
import { useAuth } from './AuthContext';

const MainPage = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/usuarios"
          element={isLoggedIn ? <UserList /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/chamados"
          element={isLoggedIn ? <ChamadoList /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/logout"
          element={
            isLoggedIn ? (
              <div>
                <p>Tem certeza de que deseja sair?</p>
                <button onClick={logout}>Logout</button>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        {/* Rota padrão para redirecionamento */}
        <Route path="/*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
};

export default MainPage;
