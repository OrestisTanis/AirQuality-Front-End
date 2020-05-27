import React from 'react';
import { Link, Route, Switch } from "react-router-dom";
import Navbar from './navbar/navbar';
import Footer from './footer/footer';
import Home from './home/home';
import LandingPage from './landing-page/landing-page';


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




