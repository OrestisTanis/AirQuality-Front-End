import React from 'react';
import { Route } from "react-router-dom";
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
// import PathWatcher from './path-watcher/path-watcher';
import ProductDetails from './products/product-details';
import useUserState from './user-state';
import Order from './order/order';
import Cart from './cart/cart';
import SensorRegistration from './sensor-registration/sensor-registration';
import Data from './data/data';
import CompletePayment from './complete-payment/complete-payment';
import SignUpSuccess from './sign-up/sign-up-success';
import AdminPanel from './admin-panel/admin-panel';
import AdminProduct from './admin-panel/admin-product';
import Sensors from './sensors/sensors';

function AirApp() {
    const [userState, setUserState] = useUserState();

    return (
        <>
            {/* Scrolls to top of the page when url changes */}
            <ScrollToTop />
            {/* Checks for JWT validity on URL change and sets the user state accordingly */}
            <AuthGuard />

            <Navbar></Navbar>
            <Route path="/map" component={Map} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/products/:id" component={ProductDetails} />
            <Route path="/company" component={Company} />
            <Route path="/order" component={Order} />
            <Route path="/complete-payment" component={CompletePayment} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/" component={LandingPage} />
            <Route path="/data" component={Data} />
            <Route path="/registration-success" component={SignUpSuccess} />
            <Route path="/admin" exact={true} component={AdminPanel} />
            <Route path="/admin/products/" component={AdminProduct} />
            {/* {console.log("isLoggedIn: ", userState.isLoggedIn)} */}
            {!userState.isLoggedIn && <Route path="/login" component={Login} />}
            {!userState.isLoggedIn && <Route path="/sign-up" component={SignUp} />}
            {userState.isLoggedIn &&  <Route path="/sensor-registration" component={SensorRegistration} />}
            {userState.isLoggedIn &&  <Route path="/sensors" component={Sensors} />}

            <Footer></Footer>
        </>
    )
}

export default AirApp;
