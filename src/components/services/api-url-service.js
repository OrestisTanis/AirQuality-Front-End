function ApiUrlService() {
    // do we have an existing instance?
    if (typeof ApiUrlService.instance === 'object') {
        return ApiUrlService.instance;
    }

    // proceed as normal
    this.API_URL = "http://173.249.63.213:8080/";

    this.getApiURL = function() {
        return this.API_URL;
    }

     // cache
	ApiUrlService.instance = this;

	// implicit return
	return this;
}

export default new ApiUrlService();
