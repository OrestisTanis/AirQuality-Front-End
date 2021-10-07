import React, {useState, useEffect} from 'react';
import SensorService from '../services/sensor-service';
import useUserState from '../user-state';
import authService from '../services/authentication-service';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import './sensors.css';
import Loader from 'react-loader-spinner';

function Sensors() {
    const padTop = "4.78rem";
    const [nonRegistered, setNonRegistered] = useState([]);
    const [registered, setRegistered] = useState([]);
    const [errors, setErrors] = useState({});
    const username = authService.getCurrentUser();
    const [registeredAddr, setRegisteredAddr] = useState([]);
    const [loadingRegistered, setLoadingRegistered] = useState(true);
    const [loadingNonRegistered, setLoadingNonRegistered] = useState(true);

    function getNonRegistered() {
        SensorService.getNonRegisteredSensorsByUsername(username).then(res => {
            // Handle successful fetch of data
            const fetchedSensors = [];
            res.data.map(sensor => {
                fetchedSensors.push(sensor);
            });
            setNonRegistered(fetchedSensors, setLoadingNonRegistered(false));
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
                setRegistered(fetchedSensors,  setLoadingRegistered(false));
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
        SensorService.deleteBySensorLocationId(sensorLocationId)
        .then(() => {
            let sensorToDelete;
            const filteredRegistered = registered.filter((sensor)=>{
                if (sensor.sensorLocationId !== sensorLocationId){
                    return true;
                }
                else{
                    sensorToDelete = {...sensor};
                    // console.log(sensorToDelete);
                    return false;
                }
            })
            setRegistered(filteredRegistered);
            const tempNonRegistered = [...nonRegistered, sensorToDelete ];
            setNonRegistered(tempNonRegistered);
        }).catch((err) => {
            // console.log(err);
        });      

        
    }

    const spinner = () => {
        return  <Loader
            type="Oval"
            color="#2d3a49"
            height={100}
            width={100}
            timeout={3000}
            className="mt-3 mb-3 text-center"
        />        
    }

    return (<div style={{
            paddingTop: padTop
        }}>
        <h2 className="text-center pt-4 mb-4">
            Registered sensors
        </h2>
        <div className="container">
            <table className="table table-responsive-sm">
                <thead>
                    <tr>
                        <th style={{
                                width: '20%'
                            }}>#</th>
                        <th style={{
                                width: '20%'
                            }}>Location</th>
                        <th style={{
                                width: '20%'
                            }}>Label</th>
                        <th style={{
                                width: '20%'
                            }}>View</th>
                        <th style={{
                                width: '20%'
                            }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {  
                        !loadingRegistered && registered.map((item, index) => {
                            return <tr key={item.sensorLocationId}>
                                <th scope="row">{index + 1}</th>
                                <td>
                                    <a>{registeredAddr[index]}</a>
                                </td>
                                <td>{item.label}</td>
                                <td>
                                    <button type="button" className="btn btn-warning btn-block mr-1">
                                        <Link to="/data" style={{
                                                textDecoration: 'none',
                                                color: 'white'
                                            }}>Data</Link>
                                    </button>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-block btn-danger" onClick={() => handleDelete(item.sensorLocationId)}>Delete</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
               
            </table>
            {loadingRegistered &&
                spinner()
            }
        </div>
        
        <h2 className="text-center mb-4 mt-4">
            Non registered Sensors
        </h2>

        <div className="container">
            <table className="table table-responsive-sm" >
                <thead>
                    <tr>
                        <th style={{
                                width: '25%'
                            }}>#</th>
                        <th style={{
                                width: '25%'
                            }}>Sensor ID</th>
                        <th style={{
                                width: '25%'
                            }}>Type</th>
                        <th style={{
                                width: '25%'
                            }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        !loadingNonRegistered && nonRegistered.map((item, index) => {
                            return <tr key={item.soldSensorId}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.soldSensorId}</td>
                                <td>{item.productType}</td>
                                <td>
                                    <button type="button" className="btn btn-success mr-1 btn-block">
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
            {   loadingNonRegistered &&  
                spinner()
            }
        </div>
    </div>)
}

export default Sensors;
