import React, { useState } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { RecoilRoot, useRecoilState } from 'recoil'


import Login from "./Components/Login";
import Register from './Components/Register'
import Store from './Components/Store'
import PrivateRoute from './Components/PrivateRoute'
import Dashboard from './Components/Dashboard'
import Navigation from './Navigation'

function App() {

  return (
    <RecoilRoot>
      <Router>
        <div className="App">
          <Navigation />
          <Route exact path='/'component={Store} />
          <Route exact path='/login'component={Login} />
          <Route exact path='/register'component={Register} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
        </div>
        
      </Router>
    </RecoilRoot>
  );
}

export default App;
