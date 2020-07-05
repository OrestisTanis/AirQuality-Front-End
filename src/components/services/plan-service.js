import axios from 'axios';
import authHeader from './auth-header';
import apiUrlService from './api-url-service';

function PlanService() {
    // do we have an existing instance?
    if (typeof PlanService.instance === 'object') {
        return PlanService.instance;
    } 

    // proceed as normal
    this.API_URL = apiUrlService.getApiURL();

    this.getAllPlans = function() {
        // return axios.get(this.API_URL + 'plans', { headers: authHeader() });
        return axios.get(this.API_URL + 'plans');
    }

     // cache
	PlanService.instance = this;
	
	// implicit return
	return this;
}

export default new PlanService();