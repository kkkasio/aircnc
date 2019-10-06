import React, { useState, useMemo } from 'react';
import camera from '../../assets/camera.svg';
import './styles.css';

import api from '../../services/api';

export default function New({ history }) {
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit({ event }) {
    event.preventDefault();

    const data = new FormData();
    const user_id = localStorage.getItem('user');

    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);
    data.append('thumbnail', thumbnail);

    await api.post('/spots', data, {
      headers: {
        user_id,
      },
    });

    history.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        className={thumbnail ? 'hasThumbnail' : ''}
        style={{ backgroundImage: `url(${preview})` }}
      >
        <input
          type="file"
          onChange={event => setThumbnail(event.target.files[0])}
        />
        <img src={camera} alt="Selecione uma imagem" />
      </label>

      <label htmlFor="company">EMPRESA *</label>
      <input
        type="text"
        name="company"
        id="company"
        value={company}
        onChange={event => setCompany(event.target.value)}
        placeholder="Sua empresa incrível"
      />

      <label htmlFor="techs">
        TECNOLOGIAS* <span>(separadas por virgula)</span>
      </label>
      <input
        type="text"
        name="techs"
        id="techs"
        value={techs}
        onChange={event => setTechs(event.target.value)}
        placeholder="Quais tecnogolias usam?"
      />

      <label htmlFor="price">
        VALOR DA DIÁRIA* <span>(em branco para GRATUITO)</span>
      </label>
      <input
        type="text"
        name="price"
        id="price"
        value={price}
        onChange={event => setPrice(event.target.value)}
        placeholder="Valor cobrado por dia"
      />

      <button type="submit" className="btn">
        Cadastrar
      </button>
    </form>
  );
}
