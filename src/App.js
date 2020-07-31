import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from "./Components/Login";
import PrivateRoute from './Components/PrivateRoute'
import Dashboard from './Components/Dashboard'

function App() {
  

  return (
    <Router>
      <div className="App">
        <Route exact path='/'component={Login} />
        <Route exact path='/login'component={Login} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
      </div>
      
    </Router>
  );
}

export default App;
