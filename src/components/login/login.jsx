import React, {useState} from 'react';
import axios from 'axios';

function Login(){
    const starStyle = {
        color: "rgba(253, 17, 17, 0.7)"
    };

    const [errors, setErrors]=useState({});

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

    function validateForm(formData) {
        const errors = {}
        // Username
        if (!formData.username) errors.username = "Username is required";
        // else if (formData.username.length < 5) errors.username ="Username must be at least 5 characters long";
        // else if (!validateUserName(formData.username)) errors.username = "Username can contain only english letters and numbers";
        // Password
        if (!formData.password) errors.password = "Password is required";
        // else if (formData.password.length < 6) errors.password = "Password must be at least 6 characters long"
        return errors;
    }
    // function validateUserName(userName) {
    //     const regex = RegExp("^[a-zA-Z0-9]+$");
    //     return regex.test(String(userName));
    // }

    function doLogin(userInfo) {
        // Go to the server || dispatch an action
        axios.post(`http://localhost:8080/authenticate`, userInfo, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // Authorization: 'Bearer ' + token // if you use token
            }
        })
        .then(res => {
            console.log(res);
            console.log(res.data);
        }).catch(error => {
            console.log(error.message);
        })
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
                            <form className="mt-4 mb-5" id="login-form" onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" name="username" id="username" className="form-control" />
                                    <small className={(errors.username ? "show" : "hide") + " signup-errors"}>
                                        {errors.username + ""}
                                    </small>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" id="password" className="form-control" />
                                    <small className={(errors.password ? "show" : "hide") + " signup-errors"}>
                                        {errors.password + ""}
                                    </small>
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


