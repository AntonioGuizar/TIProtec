import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, deleteUser } from '../../api';

function UserList() {
  const [users, setUsers] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    getUsers()
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleDeleteUser = (userId) => {
    setUserToDelete(userId);
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      deleteUser(userToDelete)
        .then(() => {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== userToDelete)
          );
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
        });

      setUserToDelete(null);
    }
  };

  // if users is empty, display a message and hide the table
  return (
    <div>
      <h2>Lista de usuarios</h2>
      {users.length === 0 && <p>No hay usuarios registrados</p>}
      <Link className='btn btn-primary' to='/create'>Nuevo usuario</Link>
      {users.length > 0 && <p>Hay {users.length} usuarios registrados</p>}
      <div className='table-responsive'>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Nombre</th>
              <th scope='col'>Primer Apellido</th>
              <th scope='col'>Segundo Apellido</th>
              <th scope='col'>Fecha Nacimiento</th>
              <th scope='col'>Email</th>
              <th scope='col'>Rol</th>
              <th scope='col'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.nombre}</td>
                <td>{user.primer_apellido}</td>
                <td>{user.segundo_apellido}</td>
                <td>{user.fecha_nacimiento}</td>
                <td>{user.email}</td>
                <td>{user.rol}</td>
                <td>
                  <Link className='btn btn-primary' to={`/edit/${user.id}`}>Editar</Link>
                  <button className='btn btn-danger' onClick={() => handleDeleteUser(user.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Alert for confirming deletion */}
      {userToDelete && (
        <div>
          <p>¿Seguro que desea eliminar a este usuario?</p>
          <button className='btn btn-danger' onClick={confirmDeleteUser}>Sí</button>
          <button className='btn btn-primary' onClick={() => setUserToDelete(null)}>No</button>
        </div>
      )}
    </div>
  );
}

export default UserList;
