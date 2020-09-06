import axios from "axios";
import apiUrlService from './api-url-service';

// Singleton
function AuthService() {
	// do we have an existing instance?
	if (typeof AuthService.instance === 'object') {
		return AuthService.instance;
    }

	// proceed as normal
    this.roles = localStorage.getItem("roles") || [];
    this.API_URL = apiUrlService.getApiURL();
    this.registered = false;

    // register
    this.register = function(userInfo) {
        return new Promise((resolve, reject) =>
            axios.post(this.API_URL + "register", userInfo)
            .then(res => {
                console.log(res);
                console.log(res.data);
                this.registered = true;
                console.log("FROM INSIDE " + this.registered);
                resolve(true);
            }).catch(error => {
                console.log(error.message);
                this.registered = false;
                reject(false);
            }
        ))
    }

    // login
    this.login = function(username, password) {
        return axios.post(this.API_URL + "authenticate", {
                username,
                password
            })
            // .then((response) => {
            //     if (response.data.token) {
            //         localStorage.setItem("user", JSON.stringify(response.data.username));
            //         localStorage.setItem("token", JSON.stringify(response.data.token));
            //         localStorage.setItem("roles", JSON.stringify(response.data.roles));
            //         (response.data.roles).forEach((role)=>{
            //             this.roles.push(role);
            //         })
            //         return {username: username, roles: this.roles};
            //     }
            // })
            // .catch(function (response) {
            //     //handle error
            //     return null;
            // });
    }

    // logout
    this.logout = function() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("roles");
        this.roles = [];
    }

    // get current user
    this.getCurrentUser = function() {
        return JSON.parse(localStorage.getItem('user'));;
    }

    // get user roles
    this.getUserRoles = function() {
       return this.roles;
    }

    // isUserLoggedIn
    this.isUserLoggedIn = function(){
        const result = localStorage.getItem("user") ? true : false;
        console.log("isLOGGEDIN: " + result);
        return result;
    }

     // isUserAdmin
     this.isUserAdmin = function(){
        console.log("this.roles: " + this.roles);
        return this.roles.includes("ROLE_ADMIN");
    }

	// cache
	AuthService.instance = this;

	// implicit return
	return this;
}

export default new AuthService();
