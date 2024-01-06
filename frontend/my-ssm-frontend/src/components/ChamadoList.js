import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const ChamadoList = () => {
  const [chamados, setChamados] = useState([]);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchChamados = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/chamados');
        setChamados(response.data);
      } catch (error) {
        console.error('Erro ao buscar chamados:', error);
      }
    };

    if (isLoggedIn) {
      fetchChamados();
    }
  }, [isLoggedIn]);

  return (
    <div>
      <h2>Lista de Chamados</h2>
      {isLoggedIn ? (
        <ul>
          {chamados.map((chamado) => (
            <li key={chamado.id}>{chamado.nome}</li>
          ))}
        </ul>
      ) : (
        <p>Você precisa estar logado para ver a lista de chamados.</p>
      )}
    </div>
  );
};

export default ChamadoList;
