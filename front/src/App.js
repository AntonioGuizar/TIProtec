import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import UserList from './components/users/UserList';
import AddUser from './components/users/AddUser';
import UpdateUser from './components/users/UpdateUser';

const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/list" className="navbar-brand">TI Protec</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/list" className="nav-link">Lista de usuarios</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path="/" component={UserList} />
          <Route exact path="/list" component={UserList} />
          <Route path="/create" component={AddUser} />
          <Route path="/edit/:id" component={UpdateUser} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
