import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import './navbar.css';
import usePathNameState from '../pathname-state';
import useUserState from '../user-state';
import LogOut from '../logout/logout';


function Navbar() {
    // Styles
    const startPadding = { paddingTop: "1.1rem", paddingBottom: "1.1rem" };
    const endPadding = { paddingTop: "0.2rem", paddingBottom: "0.2rem" };
    const startNavBgColor = { backgroundColor: "rgba(0,0,0,0.0)" };
    const endNavBgColor = { backgroundColor: "rgb(238, 238, 238)" };
    const startTextColor = { color: "white" };
    const endTextColor = { color: "black" };

    // Hooks
    // For watching url changes
    const [pathName, setPathName] = usePathNameState();
    // Used for navbar animations
    const [navScrollStyle, setNavScrollStyle] = useState(startPadding);
    const [navScrollColor, setNavScrollColor] = useState(startNavBgColor);
    const [textColor, setTextColor] = useState(startTextColor);
    const [toggleButton, setToggleButton] = useState({});
    // The user's global state
    const [userState, setUserState] = useUserState();
    const history = useHistory();

    // Will be executed once, on component mount
    useEffect(() => {
        animateNavBar();
    }, []);

    // Will be executed each time the url changes
    useEffect(() => {
        animateNavBar();
    }, [pathName]);

    function toggleNavbar() {
        // console.log(toggleButton);
        if (toggleButton.classList.contains('show')) toggleButton.classList.remove('show');
    }

    function animateNavBar() {
        // Get the height of the video or get 0
        let bgVideo = document.getElementById("video-bg") || null;
        let bgVideoHeight = bgVideo ? bgVideo.offsetHeight : 0;

        setToggleButton(document.querySelector(".navbar-collapse, .collapse"));

        // console.log("BGVIDEOHEIGHT: ", bgVideoHeight);
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
                setNavScrollStyle(startPadding);
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
    }

    // Gets called from the modal
    function handleSignOut() {
        localStorage.removeItem("token");
        const path = "/";
        history.push(path);
    }

    return (
        <>
            <div className="container-fluid p-0 nav-outer-container text-white" style={navScrollColor} >
                <div className="container nav-inner-container">
                    {/* NAVBAR  */}
                    <nav className="navbar navbar-expand-lg navbar-light" style={navScrollStyle}>
                        {/* BRAND NAME  */}
                        <div className="pl-2"><Link to="/" className="navbar-brand"><h4 style={textColor} onClick={toggleNavbar}>AirSense</h4></Link></div>
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
                                    <Link to="/map" className="nav-link" style={textColor} onClick={toggleNavbar}>Map</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/products" className="nav-link" style={textColor} onClick={toggleNavbar}>Products</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/company" className="nav-link" style={textColor} onClick={toggleNavbar}>Our Company</Link>
                                </li>
                            </ul>
                            {/* LOGIN, SIGN-UP BUTTONS  */}
                            {
                                !userState.isLoggedIn ?
                                    <><div className="d-flex justify-content-center ml-md-auto">
                                        <button className="btn" type="button"><Link to="/login" className="nav-link" style={textColor} onClick={toggleNavbar}>Login</Link></button>
                                    </div>
                                        <div className="d-flex justify-content-center">
                                            <button className="btn" type="button"><Link to="/sign-up" className="nav-link" style={textColor} onClick={toggleNavbar}>Sign-up</Link></button>
                                        </div></>
                                    :
                                    <div className="d-flex justify-content-center ml-md-auto">
                                        <button className="btn" type="button"><Link to="/" className="nav-link"  data-toggle="modal" data-target="#exampleModal" style={textColor} onClick={toggleNavbar}>Sign out</Link></button>
                                    </div>
                            }
                        </div>
                    </nav>
                </div>
            </div>
            {/* <div style={{height: '7rem'}}></div> */}

            {/* Sign Out Modal */}
            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Signing Out</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to sign out?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={handleSignOut} data-dismiss="modal" id="sign-out-button" >Sign out</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}



export default Navbar;

