import React from 'react';

function SignUp() {
    return (
        <div className="container pt-5 pb-5">
            <div className="row d-flex justify-content-center mt-5 mb-5">
                <div className="col-9 col-md-8 col-lg-6 shadow">
                    <div className="row d-flex justify-content-center mt-4 mb-4">
                        <div className="col-12 text-center mt-3 lead">
                            Sign Up
                        </div>
                        <div className="col-12">
                            <form className="mt-4 mb-5" id="signup-form">
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" name="username" id="username" className="form-control" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" name="password" id="password" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">E-mail</label>
                                    <input type="text" name="email" id="email" className="form-control" />
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



