import React, { useState } from 'react';
import { addUser } from '../../api';

function AddUser() {
  const [error, setError] = useState(null);
  const [errorName, setErrorName] = useState(null);
  const [errorFirstLastName, setErrorFirstLastName] = useState(null);
  const [errorSecondLastName, setErrorSecondLastName] = useState(null);
  const [errorDate, setErrorDate] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorRol, setErrorRol] = useState(null);
  const [user, setUser] = useState({
    nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    fecha_nacimiento: '',
    email: '',
    rol: '',
  });

  const handleInputChange = (e) => {
    if (e.target.name === 'nombre') {
      !isValidName(e.target.value) ? setErrorName('El nombre no es valido, debe tener entre 2 y 50 caracteres y contener solo letras') : setErrorName(null);
    }
    if (e.target.name === 'primer_apellido') {
      !isValidName(e.target.value) ? setErrorFirstLastName('El primer apellido no es valido, debe tener entre 2 y 50 caracteres y contener solo letras') : setErrorFirstLastName(null);
    }
    if (e.target.name === 'segundo_apellido') {
      !isValidName(e.target.value) ? setErrorSecondLastName('El segundo apellido no es valido, debe tener entre 2 y 50 caracteres y contener solo letras') : setErrorSecondLastName(null);
    }
    if (e.target.name === 'email') {
      !isValidEmail(e.target.value) ? setErrorEmail('El email no es valido') : setErrorEmail(null);
    }
    if (e.target.name === 'fecha_nacimiento') {
      !isValidDate(e.target.value) ? setErrorDate('La fecha no es valida, debe tener un formato YYYY-MM-DD') : setErrorDate(null);
    }
    if (e.target.name === 'rol') {
      !isValidRol(e.target.value) ? setErrorRol('El rol no es valido, debe ser Administrador, Gerente u Operador') : setErrorRol(null);
    }
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

  function isValidName(name) {
    return /^[a-zA-Z\s]{2,50}$/.test(name);
  }

  function isValidDate(dateString) {
    if(!/^\d{4}-\d{2}-\d{2}$/.test(dateString))
        return false;
    var parts = dateString.split("-");
    var year = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var day = parseInt(parts[2], 10);
    console.log(year, month, day);
    if(year < 1900 || year > 2100 || month === 0 || month > 12)
        return false;
    if(day > 28 && month === 2) {
        if(year % 4 !== 0 || (year % 100 === 0 && year % 400 !== 0) || (year % 400 === 0))
            return false;
    }
    if(day === 0 || day > 31)
        return false;
    return true;
  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidRol(rol) {
    return rol === 'Administrador' || rol === 'Gerente' || rol === 'Operador';
  }

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
                required
            />
            {errorName && <span style={{color: 'red'}}>{errorName}</span>}
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
                required
            />
            {errorFirstLastName && <span style={{color: 'red'}}>{errorFirstLastName}</span>}
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
                required
            />
            {errorSecondLastName && <span style={{color: 'red'}}>{errorSecondLastName}</span>}
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
                required
            />
            {errorDate && <span style={{color: 'red'}}>{errorDate}</span>}
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
                required
            />
            {errorEmail && <span style={{color: 'red'}}>{errorEmail}</span>}
        </div>
        <div className='form-group mt-2'>
            <label htmlFor='rol'>Rol</label>
            <select
                className='form-control'
                id='rol'
                name='rol'
                value={user.rol}
                onChange={handleInputChange}
                required
            >
                <option value=''>Select a role</option>
                <option value='Administrador'>Administrador</option>
                <option value='Gerente'>Gerente</option>
                <option value='Operador'>Operador</option>
            </select>
            {errorRol && <span style={{color: 'red'}}>{errorRol}</span>}
        </div>
        <button type='submit' className='btn btn-primary btn-lg mt-3'>Crear usuario</button>
      </form>
      {error && <p className='text-danger mt-3'>{error}</p>}
    </div>
  );
}

export default AddUser;
