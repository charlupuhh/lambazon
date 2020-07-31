import React, {useEffect, useState} from "react";
import createWithAuth from './utils/createWithAuth'
import {useHistory} from "react-router-dom";


const Register = () =>{
    const [cred, setCred]= useState({
        username: '',
        password: '',
        primaryemail:''
    });
    const {push}= useHistory();

    const handleChange = e =>{
        setCred({...cred, [e.target.name]: e.target.value})
    }
    const handleSubmit= e =>{
        e.preventDefault();
            createWithAuth()
            .post('/createnewuser', cred)
            .then(res =>{
                console.log("login page data: ", res)
                localStorage.setItem("token", res.data.access_token)
                 push("/login")
            })
            .catch(err=> console.log("this is the error from login: ", err))
    }
    return(
        <div>
            <h1>Join Lambazon!</h1>
            <form onSubmit={handleSubmit}>
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
                <input 
                    placeholder="primaryemail"
                    type="email"
                    name="primaryemail"
                    onChange={handleChange}
                    value={cred.primaryemail}
                />
                <button type="submit">Create Account</button>
            </form>
        </div>
    )
}
export default Register;