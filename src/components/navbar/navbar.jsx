import React from 'react';
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <>
            {/* NAVBAR  */}
            <nav className="navbar navbar-expand-lg navbar-light bg-gray">
                {/* BRAND NAME  */}
                <div className="pl-2"><Link to="/" className="navbar-brand">AirSense</Link></div>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* LINKS, LOGIN, SIGN-UP BUTTONS  */}
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* LINKS */}
                    <ul className="navbar-nav d-flex justify-content-center text-center">
                        <li className="nav-item">
                            <Link to="/home" className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Our Products</a>
                        </li>
                    </ul>
                    {/* LOGIN, SIGN-UP BUTTONS  */}
                    <div className="d-flex justify-content-center ml-md-auto">
                        <button className="btn" type="button">Login</button>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn" type="button">Sign-Up</button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;

