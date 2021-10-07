import React, { useState } from 'react';
import axios from 'axios';
import '../../shared/css/validation-errors.css';
import useUserState from '../user-state';
import { useHistory } from 'react-router-dom';
import authService from '../services/authentication-service';

function Login() {
    const starStyle = {
        color: "rgba(253, 17, 17, 0.7)"
    };
    // The user's global state
    const [userState, setUserState] = useUserState();
    // Private state used for error handling
    const [errors, setErrors] = useState({});
    let history = useHistory();

    // Handler for the form submit event
    function handleLogin(event) {
        event.preventDefault();
        const elements = event.currentTarget.elements;
        const username = elements.username.value;
        const password = elements.password.value;
        const errors = validateForm({ username, password });
        setErrors(errors)
        if (!Object.keys(errors).length) {
            doLogin({ username, password });
        }
    }

    // Creates an error object and adds the corresponding 
    // properties in case of invalid data. Used by the handler function
    function validateForm(formData) {
        const errors = {}
        // Username
        if (!formData.username) errors.username = "Username is required";
        // Password
        if (!formData.password) errors.password = "Password is required";
        return errors;
    }

    // Gets called only if the form has no errors upon submit.
    // Used by the handler function
    async function doLogin(userInfo) {
        authService.login(userInfo.username, userInfo.password)
        .then(response=>{
            // console.log(response.data);
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data.username));
                localStorage.setItem("token", JSON.stringify(response.data.token));
                localStorage.setItem("roles", JSON.stringify(response.data.roles));
                setUserState({isLoggedIn: true, roles: response.data.roles, username: response.data.username});
                const path = "/";
                history.push(path);
            }
        })
        .catch((err)=>{
            // console.log(err);
            const errors = {};
            errors.invalidCredentials = "Invalid username or password.";
            setErrors(errors);
        })
        // .then((res)=>{
        //     setUserState({isLoggedIn: true, roles: res.roles, username: res.username});
        //     const path = "/";
        //     history.push(path);
        // })
        // .catch((err)=>{
        //     const errors = {};
        //     errors.invalidCredentials = "Invalid username or password.";
        //     setErrors(errors);
        // });

        // const userDetailsObj = await authService.login(userInfo.username, userInfo.password)
        // console.log(userDetailsObj);
        // if (userDetailsObj){
        //     setUserState({isLoggedIn: true, roles: userDetailsObj.roles, username: userDetailsObj.username});
        //     const path = "/";
        //     history.push(path);
        // }
        // else {
        //     const errors = {};
        //     errors.invalidCredentials = "Invalid username or password.";
        //     setErrors(errors);
        // }
    }

    return (
        <div className="container pt-5 pb-5">
            <div className="row d-flex justify-content-center mt-5 mb-5">
                <div className="col-9 col-md-8 col-lg-6 shadow mt-5">
                    <div className="row d-flex justify-content-center mt-5 mb-4">
                        <div className="col-12 text-center mt-3">
                            <h5>Member Login</h5>
                        </div>
                        <div className="col-12">
                            <form className="mt-4 mb-4" id="login-form" onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" name="username" id="username" className="form-control" />
                                    <small className={(errors.username ? "show" : "hide") + " signup-errors"}>
                                        {errors.username + ""}
                                    </small>
                                </div>

                                <div className="form-group mb-0">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" id="password" className="form-control" />
                                    <small className={(errors.password ? "show" : "hide") + " signup-errors"}>
                                        {errors.password + ""}
                                    </small>
                                </div>
                                <div className={(errors.invalidCredentials ? "show" : "hide") + " signup-errors text-center"}>
                                    {errors.invalidCredentials + ""}
                                </div>
                            </form>
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn w-100 btn-primary" form="login-form">Log in</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;



