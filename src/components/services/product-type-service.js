import axios from 'axios';
import authHeader from './auth-header';
import apiUrlService from './api-url-service';

function ProductTypeService() {
    // do we have an existing instance?
    if (typeof ProductTypeService.instance === 'object') {
        return ProductTypeService.instance;
    }

    // proceed as normal
    this.API_URL = apiUrlService.getApiURL();

    this.getAllProductTypes = function() {
        return axios.get(this.API_URL + 'product-types', { headers: authHeader() });
    }

     // cache
	ProductTypeService.instance = this;

	// implicit return
	return this;
}

export default new ProductTypeService();
