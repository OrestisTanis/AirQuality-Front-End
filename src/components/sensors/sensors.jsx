import React, {useState, useEffect} from 'react';
import SensorService from '../services/sensor-service';
import useUserState from '../user-state';
import authService from '../services/authentication-service';

function Sensors() {
  const padTop = "4.78rem";
  const [nonRegistered, setNonRegistered] = useState([]);
  const [registered, setRegistered] = useState([]);
  const [errors, setErrors] = useState({});
  const username = authService.getCurrentUser();

  function getNonRegistered() {
    SensorService.getNonRegisteredSensorsByUsername(username).then(res => {
      // Handle successful fetch of data
      const fetchedSensors = [];
      res.data.map(sensor => {
        fetchedSensors.push(sensor);
      });
      console.log(fetchedSensors);
      setNonRegistered(fetchedSensors);
    }).catch(error => {
      // Handle errors
      if (error.message) {
        const errors = {};
        errors.message = error.message;
        setErrors(errors);
      }
    });
  }
  function getRegistered() {
    SensorService.getRegisteredSensorLocationsByUsername(username).then(res => {
      // Handle successful fetch of data
      const fetchedSensors = [];
      res.data.map(sensor => {
        fetchedSensors.push(sensor);
      });;
      console.log(fetchedSensors);
      setRegistered(fetchedSensors);
    }).catch(error => {
      // Handle errors
      if (error.message) {
        const errors = {};
        errors.message = error.message;
        setErrors(errors);
      }
    });
  }
  useEffect(() => {
    getNonRegistered();
    getRegistered();
  }, []);

  return (<div style={{
      paddingTop: padTop
    }}>
    <h2 className="text-center">
      Registered sensors
    </h2>
    <div className="container w-50">
      <table className="table">
        <thead>
          <tr>
            <th style={{
                width: '30%'
              }}>#</th>
            <th style={{
                width: '30%'
              }}>Label</th>
            <th style={{
                width: '30%'
              }}>View</th>
            <th style={{
                width: '30%'
              }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            registered.map((item, index) => {
              return <tr key={item.sensorLocationId}>
                <th scope="row">{index + 1}</th>
                <td>{item.label}</td>
                <td>
                  <button type="button" className="btn btn-primary mr-1">Location</button>
                  <button type="button" className="btn btn-warning mr-1">Data</button>
                </td>
                <td>
                  <button type="button" className="btn btn-danger">Delete</button>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
    <h2 className="text-center">
      Non registered Sensors
    </h2>

    <div className="container w-50">
      <table className="table">
        <thead>
          <tr>
            <th style={{
                width: '30%'
              }}>ID</th>
            <th style={{
                width: '30%'
              }}>Type</th>
            <th style={{
                width: '30%'
              }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            nonRegistered.map((item, index) => {
              return <tr key={item.soldSensorId}>
                <th scope="row">{index + 1}</th>
                <td>{item.productType}</td>
                <td>
                  <button type="button" className="btn btn-success mr-1">Register</button>
                </td>
              </tr>
            })
          }
          <tr>
            <th scope="row">1</th>
            <td>
              Co
            </td>
            <td>
              <button type="button" className="btn btn-success mr-1">Register</button>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
          </tr>
          <tr>
            <th scope="row">3</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>)
}

export default Sensors;
