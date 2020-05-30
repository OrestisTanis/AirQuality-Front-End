import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './navbar.css';


function Navbar() {

    // These two hooks are used for changing the navbar style on scroll
    const starPadding = { paddingTop: "1.1rem", paddingBottom: "1.1rem" };
    const endPadding = { paddingTop: "0.2rem", paddingBottom: "0.2rem" };
    const startNavBgColor = { backgroundColor: "rgba(0,0,0,0.05)" };
    const endNavBgColor = { backgroundColor: "rgb(238, 238, 238)" };
    const startTextColor = { color: "white"};
    const endTextColor = { color: "black" };
    let [navScrollStyle, setNavScrollStyle] = useState(starPadding);
    let [navScrollColor, setNavScrollColor] = useState(startNavBgColor);
    let [textColor, setTextColor ] = useState(startTextColor);

    useEffect(function update() {       
        function handleScroll() {
            const backgroundVideoHeight = document.getElementById("videoBG").offsetHeight;
            // Padding
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                setNavScrollStyle(endPadding);
            } else {
                setNavScrollStyle(starPadding);
            }
            // Color
            if (document.body.scrollTop > backgroundVideoHeight || document.documentElement.scrollTop > backgroundVideoHeight) {
                console.log("CHANGING BACKGROUND COLOR");
                setNavScrollColor(endNavBgColor);
                setTextColor(endTextColor);
            } else {
                setNavScrollColor(startNavBgColor);
                setTextColor(startTextColor);
            }
        }
        document.addEventListener('scroll', handleScroll);
    }, []);




    return (
        <>
            <div className="container-fluid p-0 nav-outer-container text-white" style={navScrollColor} >
                <div className="container nav-inner-container">
                    {/* NAVBAR  */}
                    <nav className="navbar navbar-expand-lg navbar-light" style={navScrollStyle}>
                        {/* BRAND NAME  */}
                        <div className="pl-2"><Link to="/" className="navbar-brand" style={textColor}>AirSense</Link></div>
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
                                    <Link to="/home" className="nav-link" style={textColor}>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" style={textColor}>Our Products</a>
                                </li>
                            </ul>
                            {/* LOGIN, SIGN-UP BUTTONS  */}
                            <div className="d-flex justify-content-center ml-md-auto">
                                <button className="btn" type="button"><Link to="/login" className="nav-link" style={textColor}>Login</Link></button>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button className="btn" type="button"><Link to="/sign-up" className="nav-link" style={textColor}>Sign-up</Link></button>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Navbar;

