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

    this.updateProduct = function(product) {
        // return axios.get(this.API_URL + `products/${id}`, { headers: authHeader() });
        return axios.put(this.API_URL + `products/${product.id}`, product );
    }

    this.deleteProductById = function(productId) {
        // return axios.get(this.API_URL + `products/${id}`, { headers: authHeader() });
        return axios.delete(this.API_URL + `products/${productId}`);
    }

    this.addProduct = function(product) {
        // return axios.get(this.API_URL + `products/${id}`, { headers: authHeader() });
        // console.log("BEFORE SENDING TO SERVER FOR POST");
        // console.log(product);
        return axios.post(this.API_URL + `products`, product);
    }

    // cache
	ProductService.instance = this;
	
	// implicit return
	return this;
}

export default new ProductService();