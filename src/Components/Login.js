import React, {useState} from "react";
import axios from 'axios';
import {useHistory,Link} from "react-router-dom";


const Login = () =>{
    const [cred, setCred]= useState({
        username: '',
        password: '',
    });
    const {push}= useHistory();

    const handleChange = e =>{
        setCred({...cred, [e.target.name]: e.target.value})
    }
    const handleSubmit= e =>{
        e.preventDefault();
        axios.post('https://keg8893.herokuapp.com/login', `grant_type=password&username=${cred.username}&password=${cred.password}`, {
            headers: {
              // btoa is converting our client id/client secret into base64
              //if auth breaks, insert `bearer`
              Authorization: `Basic ${btoa('OAUTHCLIENTID:OAUTHCLIENTSECRET')}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .then(res => {
            console.log('data:', res.data)
            localStorage.setItem('token', res.data.access_token);
            push('/dashboard')
          })
    }
    return(
        <div>
            <h1>Login</h1>
            <form className='login-form' onSubmit={handleSubmit}>
                <input
                    placeholder="username"
                    type="text"
                    name="username"
                    onChange={handleChange}
                    value={cred.username}
                />
                <input
                    placeholder="password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={cred.password}
                />
                <button type="submit">Login</button>
            </form>
            <Link to="/register">Create Acount</Link>
        </div>
    )
}
export default Login;