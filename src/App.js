import React, { useState } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import Login from "./Components/Login";
import Register from './Components/Register'
import Store from './Components/Store'
import PrivateRoute from './Components/PrivateRoute'
import Dashboard from './Components/Dashboard'

function App() {
  

  return (
    <Router>
      <div className="App">
        <nav>
            <h1 className="store-header">Lambazon</h1>
            <div className="nav-links">
              <NavLink className='nav' exact to="/dashboard">
                Dashboard
              </NavLink>
              <NavLink className='nav' exact to="/">
                Shop
              </NavLink>
              <NavLink className='nav' to="/login">
                Login
              </NavLink>
              <NavLink className='nav' onClick={()=>window.localStorage.removeItem('token')} to="/login">
                Logout
              </NavLink>
          </div>
        </nav>
        <Route exact path='/'component={Store} />
        <Route exact path='/login'component={Login} />
        <Route exact path='/register'component={Register} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
      </div>
      
    </Router>
  );
}

export default App;
