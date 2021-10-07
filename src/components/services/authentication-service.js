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
                this.registered = true;
                resolve(true);
            }).catch(error => {
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
        return result;
    }

     // isUserAdmin
     this.isUserAdmin = function(){
        return this.roles.includes("ROLE_ADMIN");
    }

	// cache
	AuthService.instance = this;

	// implicit return
	return this;
}

export default new AuthService();
