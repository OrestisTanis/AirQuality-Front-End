import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";
import '../../shared/css/validation-errors.css';
import authService from '../services/authentication-service';

function SignUp() {
    const starStyle = {
        color: "rgba(253, 17, 17, 0.7)"
    };
    const history = useHistory();
    const [errors, setErrors]=useState({});

    function handleSignUp(event) {
        event.preventDefault();
        const elements = event.currentTarget.elements;
        // console.log(elements);
        const firstName = elements.firstName.value;
        const lastName = elements.lastName.value;
        const username = elements.username.value;
        const email = elements.email.value;
        const password = elements.password.value;
        const repeatPassword = elements.repeatPassword.value;
        const agreeTerms = elements.agreeTerms.checked;
        const errors = validateForm({ firstName, lastName, username, email, password, repeatPassword, agreeTerms });
        setErrors(errors)
        if (!Object.keys(errors).length) {
            doSignUp({ firstName, lastName, username, email, password });
        }
    }

    function validateForm(formData) {
        const errors = {}
        // FirstName
        if (!formData.firstName) errors.firstName = "First name is required";
        else if (formData.firstName.length < 3) errors.firstName ="First name must be at least 3 characters long";
        else if (!validateName(formData.firstName)) errors.firstName = "First name must be comprised either by english or greek characters";
        // LastName
        if (!formData.lastName) errors.lastName = "Last name is required";
        else if (formData.lastName.length < 3) errors.lastName ="Last name must be at least 3 characters long";
        else if (!validateName(formData.lastName)) errors.lastName = "Last name must be comprised either by english or greek characters.";
        // Username
        if (!formData.username) errors.username = "Username is required";
        else if (formData.username.length < 5) errors.username ="Username must be at least 5 characters long";
        else if (!validateUserName(formData.username)) errors.username = "Username can contain only english letters and numbers";
        // Email
        if (!formData.email) errors.email = "Email address is required";
        else if (!validateEmail(formData.email)) errors.email = "Not a valid email address";
        // Password
        if (!formData.password) errors.password = "Password is required";
        else if (formData.password.length < 6) errors.password = "Password must be at least 6 characters long"
        if (!formData.repeatPassword) errors.repeatPassword = "Please confirm password";
        else if (formData.password !== formData.repeatPassword) errors.repeatPassword = "Passwords don't match";
        // Terms & Conditions
        if (!formData.agreeTerms) errors.agreeTerms = "Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy";
        // console.log(errors);
        return errors;
    }
    function validateEmail(email) {
        const regex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regex.test(String(email).toLowerCase());
    }
    function validateUserName(userName) {
        const regex = RegExp("^[a-zA-Z0-9]+$");
        return regex.test(String(userName));
    }
    function validateName(name) {
        const regex = RegExp("(^([a-zA-Z]+)$|^([α-ωΑ-Ω]+)$)");
        return regex.test(String(name));
    }

    async function doSignUp(userInfo) {
        // Go to the server || dispatch an action
        // axios.post(`http://localhost:8080/register`, userInfo, {
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //         // Authorization: 'Bearer ' + token // if you use token
        //     }
        // })
        // .then(res => {
        //     console.log(res);
        //     console.log(res.data);
        //     const path = "/registration-success";
        //     history.push(path);
        // }).catch(error => {
        //     console.log(error.message);
        // })
        
        const registered = await authService.register(userInfo);
        if (registered){
            const path = "/registration-success";
            history.push(path);
            authService.registered = false;
        }
    }

    return (
        <div className="container pt-5 pb-5">
            <div className="row d-flex justify-content-center mt-5 mb-5">
                <div className="col-9 col-md-8 col-lg-6 shadow">
                    <div className="row d-flex justify-content-center mt-4 mb-4">
                        <div className="col-12 text-center mt-3 lead">
                            Sign Up
                        </div>
                        <div className="col-12">
                            <form className="mt-4 mb-5" id="signup-form" onSubmit={handleSignUp}>
                                <div className="row">
                                    <div className="form-group col-12 col-md-6 pr-md-1">
                                        <label htmlFor="firstName">First Name<span style={starStyle}>*</span></label>
                                        <input type="text" name="firstName" id="firstName" className="form-control" />
                                        <small className={(errors.firstName ? "show" : "hide") + " signup-errors"}>
                                            {errors.firstName + ""}
                                        </small>
                                    </div>
                                    <div className="form-group col-12 col-md-6 pl-md-1">
                                        <label htmlFor="lastName">Last Name<span style={starStyle}>*</span></label>
                                        <input type="text" name="lastName" id="lastName" className="form-control" />
                                        <small className={(errors.lastName ? "show" : "hide") + " signup-errors"}>
                                            {errors.lastName + ""}
                                        </small>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="username">Username<span style={starStyle}>*</span></label>
                                    <input type="text" name="username" id="username" className="form-control" />
                                    <small className={(errors.username ? "show" : "hide") + " signup-errors"}>
                                        {errors.username + ""}
                                    </small>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password<span style={starStyle}>*</span></label>
                                    <input type="password" name="password" id="password" className="form-control" />
                                    <small className={(errors.password ? "show" : "hide") + " signup-errors"}>
                                        {errors.password + ""}
                                    </small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="repeatPassword">Confirm password<span style={starStyle}>*</span></label>
                                    <input type="password" name="repeatPassword" id="repeatPassword" className="form-control" />
                                    <small className={(errors.repeatPassword ? "show" : "hide") + " signup-errors"}>
                                        {errors.repeatPassword + ""}
                                    </small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">E-mail<span style={starStyle}>*</span></label>
                                    <input type="text" name="email" id="email" className="form-control" />
                                    <small className={(errors.email ? "show" : "hide") + " signup-errors"}>
                                        {errors.email + ""}
                                    </small>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="agreeTerms" name="agreeTerms" />
                                    <label className="form-check-label" htmlFor="agreeTerms">I Agree to the <em><Link to="/sign-up">terms and conditions</Link></em></label>
                                </div>
                                <small className={(errors.agreeTerms ? "show" : "hide") + " signup-errors d-block"}>
                                    {errors.agreeTerms + ""}
                                </small>
                            </form>
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn w-100 btn-primary" form="signup-form">Sign-Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SignUp;



