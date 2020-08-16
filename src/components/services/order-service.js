import axios from 'axios';
import authHeader from './auth-header';
import apiUrlService from './api-url-service';

function OrderService() {
    // do we have an existing instance?
    if (typeof OrderService.instance === 'object') {
        return OrderService.instance;
    } 

    // proceed as normal
    this.API_URL = apiUrlService.getApiURL();

    this.getAllOrders = function() {
        // return axios.get(this.API_URL + 'products', { headers: authHeader() });
        return axios.get(this.API_URL + 'orders');
    }

    this.getOrderById = function(id) {
        // return axios.get(this.API_URL + `products/${id}`, { headers: authHeader() });
        return axios.get(this.API_URL + `orders/${id}`);
    }

     // cache
	OrderService.instance = this;
	
	// implicit return
	return this;
}

export default new OrderService();