import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import './navbar.css';
import usePathNameState from '../pathname-state';
import useUserState from '../user-state';
import LogOut from '../logout/logout';
import authService from '../services/authentication-service';
import $ from 'jquery';


function Navbar() {
    // Styles
    const startPadding = { paddingTop: "1.1rem", paddingBottom: "1.1rem" };
    const endPadding = { paddingTop: "0.2rem", paddingBottom: "0.2rem" };
    const startNavBgColor = { backgroundColor: "rgba(0,0,0,0.0)" };
    const endNavBgColor = { backgroundColor: "rgb(230, 230, 230)" };
    const startTextColor = { color: "white" };
    const endTextColor = { color: "black" };
    const startHamIconBgColor = { backgroundColor: "rgb(255, 255, 255)" };
    const endHamIconBgColor = { backgroundColor: "rgb(5, 5, 5)" };

    // Hooks
    // For navbar state
    const [navScrollStyle, setNavScrollStyle] = useState(startPadding);
    const [navScrollColor, setNavScrollColor] = useState(startNavBgColor);
    const [textColor, setTextColor] = useState(startTextColor);
    const [hamIconBgColor, setHamIconBgColor] = useState(startHamIconBgColor)
    const [toggleButton, setToggleButton] = useState({});
    // The user's global state
    const [userState, setUserState] = useUserState();
    // For accessing history
    const history = useHistory();

    // Will be executed once in the app's lifetime, on component mount
    useEffect(() => {
        setNavbarInitialState();
        handleNavbarStateOnScroll();
    }, []);

    // Will be executed each time the url changes
    useEffect(() => {
        setNavbarInitialState();
        handleNavbarStateOnScroll();
        // console.log("USER STATE IS: ")
        // console.log(userState);
    }, [history.location.pathname]);

    function setNavbarInitialState() {
        let pathname = history.location.pathname;
        let windowWidth = window.innerWidth;
        setToggleButton(document.querySelector(".navbar-collapse, .collapse"));

        // Check if we are in home page and mobile
        if (pathname === "/" && windowWidth < 768) {
            setNavBarState({ navColor: startNavBgColor, textColor: startTextColor, hamIconBgColor: startHamIconBgColor });
        }
        // Check if we are in home page and a tablet/pc
        if (pathname === "/" && windowWidth >= 768) {
            setNavBarState({ navColor: startNavBgColor, textColor: startTextColor, hamIconBgColor: startHamIconBgColor });
        }
        // Check if we are in another page rather than the homepage, then we dont want animations
        if (pathname !== "/") {
            setNavBarState({ navColor: endNavBgColor, textColor: endTextColor, hamIconBgColor: endHamIconBgColor });
        }
    }

    function handleNavbarStateOnScroll() {
        document.addEventListener('scroll', handleNavColorsOnScroll);
        document.addEventListener('scroll', handlePaddingOnScroll);
    }

    function handleNavColorsOnScroll() {
        let pathname = history.location.pathname;
        let windowWidth = window.innerWidth;
        let scrollHeightTrigger = 0;

        if (pathname === "/" && windowWidth < 768) scrollHeightTrigger = document.getElementById("image-poster").offsetHeight;
        if (pathname === "/" && windowWidth >= 768) scrollHeightTrigger = document.getElementById("video-bg").offsetHeight;
        if (pathname !== "/") setNavBarState({ navColor: endNavBgColor, textColor: endTextColor, hamIconBgColor: endHamIconBgColor });

        // Change navbar colors on scroll, only in the landing page)
        if (pathname === "/") {
            if (document.body.scrollTop > scrollHeightTrigger || document.documentElement.scrollTop > scrollHeightTrigger) {
                setNavBarState({ navColor: endNavBgColor, textColor: endTextColor, hamIconBgColor: endHamIconBgColor });
            } else {
                setNavBarState({ navColor: startNavBgColor, textColor: startTextColor, hamIconBgColor: startHamIconBgColor });
            }
        }
    }

    function handlePaddingOnScroll() {
        // Change padding on scroll for all pages
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) setNavScrollStyle(endPadding);
        else setNavScrollStyle(startPadding);
    }

    function setNavBarState(obj) {
        setNavScrollColor(obj.navColor);
        setTextColor(obj.textColor);
        setHamIconBgColor(obj.hamIconBgColor);
    }

    function toggleNavbar() {
        if (toggleButton.classList.contains('show')) toggleButton.classList.remove('show');
    }

    // Gets called from the modal
    // function handleSignOut() {
    //     localStorage.removeItem("token");
    //     const path = "/";
    //     history.push(path);
    // }

    return (
        <>
            <div className="container-fluid p-0 nav-outer-container text-white" style={navScrollColor} >
                <div className="container nav-inner-container">
                    {/* NAVBAR  */}
                    <nav className="navbar navbar-expand-lg navbar-light" style={navScrollStyle}>
                        {/* BRAND NAME  */}
                        <div className="pl-2"><Link to="/" className="navbar-brand"><h4 style={textColor} onClick={toggleNavbar} id="brand-name">AirSense</h4></Link></div>
                        <button className="navbar-toggler pt-2" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                            {/* <span className="navbar-toggler-icon"></span> */}
                            <span className="line" style={hamIconBgColor}>&nbsp;&nbsp;</span>
                            <span className="line" style={hamIconBgColor}>&nbsp;&nbsp;</span>
                            <span className="line" style={hamIconBgColor}>&nbsp;&nbsp;</span>
                        </button>



                        {/* LINKS, LOGIN, SIGN-UP BUTTONS  */}
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            {/* LINKS */}
                            <ul className="navbar-nav d-flex justify-content-center text-center">
                                <li className="nav-item mb-1">
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
                                    <>
                                        <div className="d-flex justify-content-center ml-md-auto">
                                            <button className="btn nav-link pb-1 pt-1" type="button"><Link to="/login" style={textColor} onClick={toggleNavbar}>Login</Link></button>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button className="btn nav-link" type="button"><Link to="/sign-up" style={textColor} onClick={toggleNavbar}>Sign-up</Link></button>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <ul className="navbar-nav d-flex justify-content-center text-center ml-auto">
                                            { userState.roles.includes("ROLE_ADMIN") ?
                                                <li className="btn nav-link" type="button"><Link to="/admin" style={textColor} onClick={toggleNavbar}>Admin</Link></li>
                                                :
                                                <>
                                                    <li className="btn nav-link" type="button"><Link to="/sensor-registration" style={textColor} onClick={toggleNavbar}>Sensor registration</Link></li>
                                                    <li className="btn nav-link" type="button"><Link to="/cart" style={textColor} onClick={toggleNavbar}>Cart</Link></li>
                                                </>
                                            }
                                            <li className="btn nav-link" type="button"><Link to="/" data-toggle="modal" data-target="#exampleModal" style={textColor} onClick={toggleNavbar}>Sign out</Link></li>
                                        </ul>
                                    </>
                            }
                        </div>
                    </nav>
                </div>
            </div>

            {/* Sign Out Modal */}
            <LogOut></LogOut>
        </>
    )
}



export default Navbar;

