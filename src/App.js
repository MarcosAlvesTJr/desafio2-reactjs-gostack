import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories')
    .then(({data}) => setRepositories(data))
  }, [])

  async function handleAddRepository() {
    const { data } = await api.post('repositories', {
      title: `Novo repositório ${Date.now()}`,
      techs: [
        'nodejs',
        'reactjs',
        'react native'
      ],
      url: 'www.github.com/MarcosAlvesTJr'
    })
    setRepositories([...repositories, data])
  }

  async function handleRemoveRepository(id, index) {
    await api.delete('repositories/' + id)
    const deleteRepository = [...repositories]
    deleteRepository.splice(index, 1)
    setRepositories(deleteRepository)
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {
        repositories.map((repository, index) => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id, index)}>
                Remover
              </button>
            </li>
          )
        })
      }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
