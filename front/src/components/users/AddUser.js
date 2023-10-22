import React, { useState } from 'react';
import { addUser } from '../../api';

function AddUser() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    fecha_nacimiento: '',
    email: '',
    rol: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(user)
      .then(response => {
        window.location.href = '/list';
      })
      .catch(error => {
        console.error('Error adding user:', error);
        setError('Error al crear el usuario (es posible que el email ya exista en la base de datos): ' + error.message);
      });
  };

  return (
    <div>
      <h2>Añadir un nuevo usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group mt-2'>
            <label htmlFor='nombre'>Nombre</label>
            <input
                type='text'
                className='form-control'
                id='nombre'
                name='nombre'
                value={user.nombre}
                onChange={handleInputChange}
            />
        </div>
        <div className='form-group mt-2'>
            <label htmlFor='primer_apellido'>Primer Apellido</label>
            <input
                type='text'
                className='form-control'
                id='primer_apellido'
                name='primer_apellido'
                value={user.primer_apellido}
                onChange={handleInputChange}
            />
        </div>
        <div className='form-group mt-2'>
            <label htmlFor='segundo_apellido'>Segundo Apellido</label>
            <input
                type='text'
                className='form-control'
                id='segundo_apellido'
                name='segundo_apellido'
                value={user.segundo_apellido}
                onChange={handleInputChange}
            />
        </div>
        <div className='form-group mt-2'>
            <label htmlFor='fecha_nacimiento'>Fecha Nacimiento</label>
            <input
                type='date'
                className='form-control'
                id='fecha_nacimiento'
                name='fecha_nacimiento'
                value={user.fecha_nacimiento}
                onChange={handleInputChange}
            />
        </div>
        <div className='form-group mt-2'>
            <label htmlFor='email'>Email</label>
            <input
                type='email'
                className='form-control'
                id='email'
                name='email'
                value={user.email}
                onChange={handleInputChange}
            />
        </div>
        <div className='form-group mt-2'>
            <label htmlFor='rol'>Rol</label>
            <select
                className='form-control'
                id='rol'
                name='rol'
                value={user.rol}
                onChange={handleInputChange}
            >
                <option value=''>Select a role</option>
                <option value='Administrador'>Administrador</option>
                <option value='Gerente'>Gerente</option>
                <option value='Operador'>Operador</option>
            </select>
        </div>
        <button type='submit' className='btn btn-primary btn-lg mt-3'>Crear usuario</button>
      </form>
      {error && <p className='text-danger mt-3'>{error}</p>}
    </div>
  );
}

export default AddUser;
