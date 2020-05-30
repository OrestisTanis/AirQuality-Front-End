import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import './navbar.css';


function Navbar() {
    // Styles
    const starPadding = { paddingTop: "1.1rem", paddingBottom: "1.1rem" };
    const endPadding = { paddingTop: "0.2rem", paddingBottom: "0.2rem" };
    const startNavBgColor = { backgroundColor: "rgba(0,0,0,0.0)" };
    const endNavBgColor = { backgroundColor: "rgb(238, 238, 238)" };
    const startTextColor = { color: "white" };
    const endTextColor = { color: "black" };
    // Elements
    const toggleButton = document.querySelector(".navbar-collapse, .collapse");

    // Hooks
    const history = useHistory();
    const [pathName, setPathName] = useState("/");
    let [navScrollStyle, setNavScrollStyle] = useState(starPadding);
    let [navScrollColor, setNavScrollColor] = useState(startNavBgColor);
    let [textColor, setTextColor] = useState(startTextColor);

    // This hook will be executed again each time the url changes
    useEffect(function update() {
        let bgVideo = document.getElementById("video-bg") || null;
        let bgVideoHeight = bgVideo ? bgVideo.offsetHeight : 0;

        console.log("BGVIDEOHEIGHT: ", bgVideoHeight);
        // Reset styles on url change
        if (bgVideoHeight === 0) {
            setNavScrollColor(endNavBgColor);
            setTextColor(endTextColor);
        }
        else {
            setNavScrollColor(startNavBgColor);
            setTextColor(startTextColor);
        }

        // This function will be called every time the user scrolls
        function handleScroll() {
            bgVideo = document.getElementById("video-bg") || null;
            bgVideoHeight = bgVideo ? bgVideo.offsetHeight : 0;
            // Change padding
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                setNavScrollStyle(endPadding);
            } else {
                setNavScrollStyle(starPadding);
            }
            
            // Change navbar and text color (We want to change this only in the landing page, where the bgVideoHeight is bigger than 0)
            if (bgVideoHeight > 0) {
                if (document.body.scrollTop > bgVideoHeight || document.documentElement.scrollTop > bgVideoHeight) {
                    setNavScrollColor(endNavBgColor);
                    setTextColor(endTextColor);
                } else {
                    setNavScrollColor(startNavBgColor);
                    setTextColor(startTextColor);
                }
            }
        }
        
        
        document.addEventListener('scroll', handleScroll);
    }, [pathName]);

   function toggleNavbar(){
        if (toggleButton.classList.contains('show')) toggleButton.classList.remove('show');
   }

    // To keep track of the url
    useEffect(() => {
        return history.listen((location) => {
            setPathName(location.pathname);
        })
    }, [history])

    return (
        <>
            <div className="container-fluid p-0 nav-outer-container text-white" style={navScrollColor} >
                <div className="container nav-inner-container">
                    {/* NAVBAR  */}
                    <nav className="navbar navbar-expand-lg navbar-light" style={navScrollStyle}>
                        {/* BRAND NAME  */}
                        <div className="pl-2"><Link to="/" className="navbar-brand" onClick={toggleNavbar}><h4 style={textColor}  >AirSense</h4></Link></div>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        {/* LINKS, LOGIN, SIGN-UP BUTTONS  */}
                        <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                            {/* LINKS */}
                            <ul className="navbar-nav d-flex justify-content-center text-center">
                                <li className="nav-item">
                                    <Link to="/home" className="nav-link" style={textColor} onClick={toggleNavbar}>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#" style={textColor} onClick={toggleNavbar}>Our Products</a>
                                </li>
                            </ul>
                            {/* LOGIN, SIGN-UP BUTTONS  */}
                            <div className="d-flex justify-content-center ml-md-auto">
                                <button className="btn" type="button"><Link to="/login" className="nav-link" style={textColor} onClick={toggleNavbar}>Login</Link></button>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button className="btn" type="button"><Link to="/sign-up" className="nav-link" style={textColor} onClick={toggleNavbar}>Sign-up</Link></button>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Navbar;

