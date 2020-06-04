import jwtDecode from 'jwt-decode';

const isJWTExpiredOrNull = function(token){
    if (token) {
        // Get a date object based on the expiration date of the jwt
        const utcSeconds = jwtDecode(token).exp
        const expDateTime = new Date(0);
        expDateTime.setUTCSeconds(utcSeconds);

        // Create a date object with the current date
        const dateTimeNow = new Date();

        // Check if token has expired and act accordingly
        if (dateTimeNow > expDateTime){
            return true
        }
        else {
            return false
        }
    }
    else {
       return true;
    }
}

export let getUsernameFromJWT = function(token){
    if (token) {
        // Get username from token
        const username = jwtDecode(token).sub;
        return username;
    }
    else {
        return '';
    }
}

export default isJWTExpiredOrNull;