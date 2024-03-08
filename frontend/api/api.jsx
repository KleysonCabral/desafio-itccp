import React, { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = "http://54.167.117.206:8000/livro/";

const App = () => {
  const [livros, setLivros] = useState([]);
  const [novoLivro, setNovoLivro] = useState({
    titulo: "",
    autor: ""
  });

  useEffect(() => {
    fetchLivros();
  }, []);

  const fetchLivros = async () => {
    try {
      const response = await axios.get(apiUrl);
      setLivros(response.data);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNovoLivro({ ...novoLivro, [name]: value });
  };

  const adicionarLivro = async () => {
    try {
      await axios.post(apiUrl, novoLivro);
      fetchLivros();
      setNovoLivro({ titulo: "", autor: "" });
    } catch (error) {
      console.error("Erro ao adicionar livro:", error);
    }
  };

  const deletarLivro = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchLivros();
    } catch (error) {
      console.error("Erro ao deletar livro:", error);
    }
  };

  //Retorno ilustrativo. Pois não estou conseguindo acessar a API
  return (
    <div>
      <h1>Livros</h1>
      <ul>
        {livros.map((livro) => (
          <li key={livro.id}>
            {livro.titulo} - {livro.autor}
            <button onClick={() => deletarLivro(livro.id)}>Deletar</button>
          </li>
        ))}
      </ul>
      <h2>Adicionar Livro</h2>
      <input
        type="text"
        name="titulo"
        placeholder="Título"
        value={novoLivro.titulo}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="autor"
        placeholder="Autor"
        value={novoLivro.autor}
        onChange={handleInputChange}
      />
      <button onClick={adicionarLivro}>Adicionar Livro</button>
    </div>
  );
};

export default App;
