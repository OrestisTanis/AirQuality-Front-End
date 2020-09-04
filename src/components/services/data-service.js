import axios from 'axios';
import authHeader from './auth-header';
import apiUrlService from './api-url-service';



function DataService() {
    

    // do we have an existing instance?
    if (typeof DataService.instance === 'object') {
        return DataService.instance;
    } 
    
    // proceed as normal
    this.API_URL = apiUrlService.getApiURL();

    this.getPublicContent = function() {
        return axios.get(this.API_URL + 'all');
    }

    this.getUserBoard = function() {
        return axios.get(this.API_URL + 'user', { headers: authHeader() });
    }

    this.getAdminBoard = function() {
        return axios.get(this.API_URL + 'admin', { headers: authHeader() });
    }

    this.getPlans = function() {
        return axios.get(this.API_URL + 'plans', { headers: authHeader() });
    }

    this.getProducts = function() {
        return axios.get(this.API_URL + 'plans', { headers: authHeader() });
    }

     // cache
	DataService.instance = this;
	
	// implicit return
	return this;
}

export default new DataService();