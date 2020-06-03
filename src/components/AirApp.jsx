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
import ProductDetails from './products/product-details';
import useUserState from './user-state';
import Cart from './cart/cart';


function AirApp() {
    const [userState, setUserState] = useUserState();

    return (
        <>  
            {/* Listens for url changes and provides globally the current parth */}
            {/* <PathWatcher/> <- Propably going to be deleted, we dont need it anymore */}

            {/* Scrolls to top of the page when url changes */}
            <ScrollToTop/>
            {/* Checks for JWT validity on URL change and sets the user state accordingly */}
            <AuthGuard/>

            <Navbar></Navbar>
            <Route path="/map" component={Map} />
            <Route exact path="/products" component={Products} />
            <Route path="/company" component={Company} />
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/products/:id" component={ProductDetails} />
            <Route exact path="/cart" component={Cart} />
            {console.log("isLoggedIn: ", userState.isLoggedIn)}
            {!userState.isLoggedIn &&  <Route path="/login" component={Login} />}
            {!userState.isLoggedIn &&  <Route path="/sign-up" component={SignUp} />}
            <Footer></Footer>

        </>
    )
}

export default AirApp;




