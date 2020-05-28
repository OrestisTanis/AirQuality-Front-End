import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function SignUp() {
    const starStyle = {
        color: "rgba(253, 17, 17, 0.7)"
    };

    function handleSubmit(event) {
        event.preventDefault();
        console.log(event.currentTarget);
        const elements = event.currentTarget.elements;
        console.log(elements);
        const userSignUpDetails = {
            "username": elements.username.value,
            "password": elements.password.value,
            "email": elements.email.value
        }

        console.log(userSignUpDetails);

        axios.post(`http://localhost:8080/register`, userSignUpDetails,
            {
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
                <div className="col-9 col-md-8 col-lg-6 shadow">
                    <div className="row d-flex justify-content-center mt-4 mb-4">
                        <div className="col-12 text-center mt-3 lead">
                            Sign Up
                        </div>
                        <div className="col-12">
                            <form className="mt-4 mb-5" id="signup-form" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="form-group col-12 col-md-6 pr-md-1">
                                        <label htmlFor="firstname">First Name<span style={starStyle}>*</span></label>
                                        <input type="text" name="firstname" id="firstname" className="form-control" />
                                    </div>

                                    <div className="form-group col-12 col-md-6 pl-md-1">
                                        <label htmlFor="lastname">Last Name<span style={starStyle}>*</span></label>
                                        <input type="text" name="lastname" id="lastname" className="form-control" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="username">Username<span style={starStyle}>*</span></label>
                                    <input type="text" name="username" id="username" className="form-control" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password<span style={starStyle}>*</span></label>
                                    <input type="password" name="password" id="password" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm password<span style={starStyle}>*</span></label>
                                    <input type="password" name="confirmPassword" id="confirmPassword" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">E-mail<span style={starStyle}>*</span></label>
                                    <input type="text" name="email" id="email" className="form-control" />
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                    <label className="form-check-label" htmlFor="exampleCheck1">I Agree to the <em><Link to="/sign-up">terms and conditions</Link></em></label>
                                </div>
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



