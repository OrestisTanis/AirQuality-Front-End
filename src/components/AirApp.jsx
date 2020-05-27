import React from 'react';
import { Link, Route, Switch } from "react-router-dom";
import Navbar from './navbar/navbar';
import Footer from './footer/footer';
import Home from './home/home';
import LandingPage from './landing-page/landingPage';
import $ from 'jquery';
import Popper from 'popper.js';
/* Bootstrap CSS */
import 'bootstrap/dist/css/bootstrap.css';
/* Custom CSS */
import '../shared/css/resets.css';
import '../shared/css/shared.css';

function AirApp() {
    return (
        <>  
            <Navbar></Navbar>
            <Route exact={true} path="/" component={LandingPage} />
            <Route path="/home" component={Home} />
            <Footer></Footer>
        </>
    )
}

export default AirApp;




