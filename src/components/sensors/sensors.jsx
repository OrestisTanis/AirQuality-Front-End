import React, {useState, useEffect} from 'react';
import SensorService from '../services/sensor-service';
import useUserState from '../user-state';
import authService from '../services/authentication-service';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';

function Sensors() {
    const padTop = "4.78rem";
    const [nonRegistered, setNonRegistered] = useState([]);
    const [registered, setRegistered] = useState([]);
    const [errors, setErrors] = useState({});
    const username = authService.getCurrentUser();
    const [registeredAddr, setRegisteredAddr] = useState([]);

    function getNonRegistered() {
        SensorService.getNonRegisteredSensorsByUsername(username).then(res => {
            // Handle successful fetch of data
            const fetchedSensors = [];
            res.data.map(sensor => {
                fetchedSensors.push(sensor);
            });
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
        SensorService.getRegisteredSensorLocationsByUsername(username).then(async res => {
            // Handle successful fetch of data
            const fetchedSensors = [];
            const tempAddrArr = [];

            const getData = async () => {
                return Promise.all(res.data.map(async (sensor, index) => {
                    // IF to be deleted - just keep the code inside, it was for testing purposes

                        fetchedSensors.push(sensor);
                        const sensorAddress = await getRegisteredSensorAddress(sensor)
                        tempAddrArr.push(sensorAddress);
                    
                }))
            }

            getData().then(() => {
                setRegisteredAddr(tempAddrArr);
                setRegistered(fetchedSensors);
            })

        }).catch(error => {
            // Handle errors
            if (error.message) {
                const errors = {};
                errors.message = error.message;
                setErrors(errors);
            }
        });
    }

    async function getRegisteredSensorAddress(fetchedRegisteredSensor) {
        let result = "";
        await SensorService.getAddressFromLatLng(fetchedRegisteredSensor).then((res) => {
            result = res.data.results[0].formatted.slice();
        }).catch(() => {
            result = fetchedRegisteredSensor.lat + " " + fetchedRegisteredSensor.lon
        });
        return result;
    }
    useEffect(() => {
        getNonRegistered();
        getRegistered();
    }, []);

    function handleDelete(sensorLocationId) {
        alert("All sensor measurements will be lost!\r\nProceed?");
        SensorService.deleteBySensorLocationId(sensorLocationId).then(() => {
            console.log({sensorLocationId: sensorLocationId});
        }).catch((err) => {
            console.log(err);
        });
        window.location.reload(true);
    }

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
                            }}>Location</th>
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
                                <td>
                                    <a>{registeredAddr[index]}</a>
                                </td>
                                <td>{item.label}</td>
                                <td>
                                    <button type="button" className="btn btn-warning mr-1">
                                        <Link to="/data" style={{
                                                textDecoration: 'none',
                                                color: 'white'
                                            }}>Data</Link>
                                    </button>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(item.sensorLocationId)}>Delete</button>
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
                            }}>#</th>
                        <th style={{
                                width: '30%'
                            }}>Sensor ID</th>
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
                                <td>{item.soldSensorId}</td>
                                <td>{item.productType}</td>
                                <td>
                                    <button type="button" className="btn btn-success mr-1">
                                        <Link to={"/sensor-registration/" + item.soldSensorId} style={{
                                                textDecoration: 'none',
                                                color: 'white'
                                            }}>Register</Link>
                                    </button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>)
}

export default Sensors;
