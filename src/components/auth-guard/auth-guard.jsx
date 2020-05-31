import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useUserState from '../user-state';
import isJWTExpiredOrNull from '../validate-jwt';

function AuthGuard(props) {
    let history = useHistory();
    // global state
    const [userState, setUserState] = useUserState();

    function setLoginStatusUsingJWT(){
        // Get token from jwt stored in client and validate the expiration date
        const token = localStorage.getItem("token");
        const tokenExpired = isJWTExpiredOrNull(token);
        if (!tokenExpired) {
            console.log("AuthGuard: token has not expired. you are logged in.")
            setUserState({isLoggedIn: true});
        }
        else {
            console.log("AuthGuard: token has expired or doesn't exist. Please log in.")
            setUserState({isLoggedIn: false});
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



