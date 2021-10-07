import axios from 'axios';
import authHeader from './auth-header';
import apiUrlService from './api-url-service';

const OPENCAGE_API_KEY = "f838dfbca8dd4dd6b961bb523aaf5ba6";

function SensorService() {
    // do we have an existing instance?
    if (typeof SensorService.instance === 'object') {
        return SensorService.instance;
    }

    // proceed as normal
    this.API_URL = apiUrlService.getApiURL();

    this.getNonRegisteredSensorsByUsername = function(username) {
        return axios.get(this.API_URL + `soldsensoruser/${username}`, { headers: authHeader() });
    }

    this.getRegisteredSensorLocationsByUsername = function(username) {
        return axios.get(this.API_URL + `sensorlocation/${username}`, { headers: authHeader() });
    }

    this.deleteBySensorLocationId = function(sensorLocationId) {
        return axios.get(this.API_URL + `sensorlocation/${sensorLocationId}`, { headers: authHeader() });
    }

    this.getCurrentPm = function() {
        return axios.get(this.API_URL + `current`);
    }

    this.registerSensor = function(sensorToRegister) {
        return axios.post(this.API_URL + `sensor-registration`, sensorToRegister, { headers: authHeader() });
    }

    this.getAddressFromLatLng = function (sensor) {
          return axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${sensor.lat}+${sensor.lon}&key=${OPENCAGE_API_KEY}`);
      }
    // cache
    SensorService.instance = this;

    // implicit return
    return this;
}

export default new SensorService();
