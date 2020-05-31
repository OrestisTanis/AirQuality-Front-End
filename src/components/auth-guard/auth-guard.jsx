import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function AuthGuard(props) {
    let [isLoggedIn, setIsLoggedIn] = useState(false);
    let history = useHistory();

    function setLoginStatusUsingJWT(){
        // Get token from jwt stored in client
        let token = localStorage.getItem("token");
        if (token) {
            // Get a date object based on the expiration date of the jwt
            const utcSeconds = jwtDecode(token).exp
            const expDateTime = new Date(0);
            expDateTime.setUTCSeconds(utcSeconds);

            // Create a date object with the current date
            const dateTimeNow = new Date();

            // Check if token has expired and act accordingly
            if (dateTimeNow > expDateTime) {
                console.log("token has expired");
                setIsLoggedIn(false);
            }
            else {
                console.log("token has not expired. you are logged in.")
                setIsLoggedIn(true);
            }
        }
        else {
            setIsLoggedIn(false);
        }
    }

    // This function will run once on app start
    useEffect(()=>{
        setLoginStatusUsingJWT();
    },[]);

    // This function will run everytime there is a change in the url
    useEffect(() => {
        return history.listen((location) => {
            setLoginStatusUsingJWT();
        })
    }, [history]);
    
    // By checking if user is logged in, we can return the children only if the user is logged in
    return (
        <>{props.children}</>
    )
}

export default AuthGuard;



