import axios from 'axios';
import authHeader from './auth-header';
import apiUrlService from './api-url-service';

function SensorService() {
    // do we have an existing instance?
    if (typeof SensorService.instance === 'object') {
        return SensorService.instance;
    }

    // proceed as normal
    this.API_URL = apiUrlService.getApiURL();

    this.getNonRegisteredSensorsByUsername = function(username) {
        // return axios.get(this.API_URL + 'Sensors', { headers: authHeader() });
        return axios.get(this.API_URL + `soldsensoruser/${username}`);
    }

    this.getRegisteredSensorLocationsByUsername = function(username) {
        // return axios.get(this.API_URL + 'Sensors', { headers: authHeader() });
        return axios.get(this.API_URL + `sensorlocation/${username}`);
    }

    this.getCurrentPm = function() {
        return axios.get(this.API_URL + `current`);
    }

    this.getSensorById = function(id) {
        // return axios.get(this.API_URL + `Sensors/${id}`, { headers: authHeader() });
        return axios.get(this.API_URL + `Sensors/${id}`);
    }

    this.registerSensor = function(sensorToRegister) {
        return axios.post(this.API_URL + `sensor-registration`, sensorToRegister);
    }

    this.updateSensor = function(Sensor) {
        // return axios.get(this.API_URL + `Sensors/${id}`, { headers: authHeader() });
        return axios.put(this.API_URL + `Sensors/${Sensor.id}`, Sensor);
    }

    this.deleteSensorById = function(SensorId) {
        // return axios.get(this.API_URL + `Sensors/${id}`, { headers: authHeader() });
        return axios.delete(this.API_URL + `Sensors/${SensorId}`);
    }

    this.addSensor = function(Sensor) {
        // return axios.get(this.API_URL + `Sensors/${id}`, { headers: authHeader() });
        console.log("BEFORE SENDING TO SERVER FOR POST");
        console.log(Sensor);
        return axios.post(this.API_URL + `Sensors`, Sensor);
    }

    // cache
    SensorService.instance = this;

    // implicit return
    return this;
}

export default new SensorService();
