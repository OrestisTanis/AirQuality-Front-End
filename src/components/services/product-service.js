import axios from 'axios';
import authHeader from './auth-header';
import apiUrlService from './api-url-service';

function ProductService() {
    // do we have an existing instance?
    if (typeof ProductService.instance === 'object') {
        return ProductService.instance;
    } 

    // proceed as normal
    this.API_URL = apiUrlService.getApiURL();

    this.getAllProducts = function() {
        // return axios.get(this.API_URL + 'products', { headers: authHeader() });
        return axios.get(this.API_URL + 'products');
    }

    this.getProductById = function(id) {
        // return axios.get(this.API_URL + `products/${id}`, { headers: authHeader() });
        return axios.get(this.API_URL + `products/${id}`);
    }

     // cache
	ProductService.instance = this;
	
	// implicit return
	return this;
}

export default new ProductService();