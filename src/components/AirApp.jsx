import React, { createContext } from 'react';
import { Link, Route, Switch } from "react-router-dom";
import Navbar from './navbar/navbar';
import Footer from './footer/footer';
import Map from './map/map';
import LandingPage from './landing-page/landing-page';
import SignUp from './sign-up/sign-up';
import Login from './login/login';
import Products from './products/products';
import Company from './company/company';
import ScrollToTop from './scrollToTop/scrollToTop';
import AuthGuard from './auth-guard/auth-guard';
import PathWatcher from './path-watcher/path-watcher';
import useUserState from './user-state';


function AirApp() {
    const [userState, setuserState] = useUserState();

    return (
        <>  
            {/* Listens for url changes and provides globally the current parth */}
            {/* <PathWatcher/> */}
            {/* Scrolls to top of the page when url changes */}
            <ScrollToTop/>
            {/* Checks for JWT validity on URL change and sets the user state accordingly */}
            <AuthGuard/>

            <Navbar></Navbar>
            <Route path="/map" component={Map} />
            <Route path="/products" component={Products} />
            <Route path="/company" component={Company} />
            <Route exact={true} path="/" component={LandingPage} />
            {console.log("isLoggedIn: ", userState.isLoggedIn)}
            {!userState.isLoggedIn &&  <Route path="/login" component={Login} />}
            {!userState.isLoggedIn &&  <Route path="/sign-up" component={SignUp} />}
            <Footer></Footer>

        </>
    )
}

export default AirApp;




