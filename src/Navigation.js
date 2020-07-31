import React from 'react'
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { useRecoilState } from 'recoil'
import { userInfoState } from './States'

export default function Navigation(){
    const [userInfo] = useRecoilState(userInfoState)

    return(
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
            <p>Hello, {userInfo.username}</p>
          </nav>
    )
}