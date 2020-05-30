import React from 'react';
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



function AirApp() {
    return (
        <>  
            <ScrollToTop/>
            <Navbar></Navbar>
            <Route path="/login" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route exact={true} path="/" component={LandingPage} />
            <Route path="/map" component={Map} />
            <Route path="/products" component={Products} />
            <Route path="/company" component={Company} />
            <Footer></Footer>
        </>
    )
}

export default AirApp;




