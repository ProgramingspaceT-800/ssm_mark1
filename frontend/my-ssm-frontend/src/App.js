import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './components/MainPage';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<MainPage />} />
      <Route path="/usuarios" element={<MainPage />} />
      <Route path="/chamados" element={<MainPage />} />
      <Route path="/logout" element={<MainPage />} />
      {/* Rota padrão para redirecionamento */}
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
