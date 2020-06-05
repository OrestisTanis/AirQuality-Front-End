import React, { useState, useEffect } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MarkerClusterGroup from "react-leaflet-markercluster";
import 'react-leaflet-markercluster/dist/styles.min.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Map() {
    const [sensors, setSensors] = useState([
        { lat: 37.968442, lng: 23.729676 }
    ]);
    const [zoomLvl, setZoomLvl] = useState(10);
    const [userPosition, setUserPosition] = useState([37.968713, 23.729195])
    // const position = [sensors[0].lat, sensors[0].lng];
    const padTop = "4.78rem";
    // let userPosition = [15.968442, 15.729676];
    function getGeolocation() {
        return (navigator.geolocation.getCurrentPosition(function (position) {
            setUserPosition([position.coords.latitude, position.coords.longitude]);
            console.log(userPosition)
        }))
    }


    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    });

    const [CurrentData, setCurrentData] = useState([]);
    const [errors, setErrors] = useState({});
    // const [userState, setUserState] = useUserState();

    // Will run once after component load
    useEffect(() => {
        getCurrentData();
        getGeolocation();
        // console.log(userState.username);
    }, []);

    function getCurrentData() {
        // Go to the server || dispatch an action
        axios.get(`http://localhost:8080/current`)
            .then(res => {
                // Handle successful fetch of data
                console.log(res.data);
                const fetchedCurrentData = [];
                res.data.map(sensorLocation => {
                    fetchedCurrentData.push(sensorLocation);
                });
                setCurrentData(fetchedCurrentData);
            }).catch(error => {
                console.log(error);
                // Handle errors
                if (error.message) {
                    const errors = {};
                    errors.message = error.message;
                    setErrors(errors);
                }
            })
    }
    return (
        <div style={{ paddingTop: padTop }}>
            <LeafletMap center={userPosition} zoom={zoomLvl} style={{ width: "100vw", height: `calc(100vh - ${padTop})`, zIndex: 5 }}>
                <TileLayer
                    attribution='Maps &nbsp;&copy;'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <MarkerClusterGroup>
                    {/* <Marker position={[{ CurrentData[0].lat }, { CurrentData[0].lon }]} /> */}
                    {CurrentData.map(sensor => {
                        return <Marker position={[sensor.lat, sensor.lon]}>
                            <Popup>
                                <table class="table">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th scope="col" className="text-center" colSpan="3">Current values</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">PM 1 </th>
                                            <td>{sensor.pm1}</td>
                                            <td>μg/m3</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">PM 2.5</th>
                                            <td>{sensor.pm25}</td>
                                            <td>μg/m3</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div>
                                    <Link className="text-canter" to="/data">Analytics</Link>
                                </div>
                            </Popup>
                        </Marker>
                    }
                    )}
                    {/* <Marker position={[37.973991, 23.726155]} />
                    <Marker position={[37.961608, 23.704598]} />
                    <Marker position={[37.973407, 23.723118]} />
                    <Marker position={[37.970295, 23.720455]} />
                    <Marker position={[37.979741, 23.732606]} />
                    <Marker position={[37.982380, 23.730974]} />
                    <Marker position={[38.011921, 23.764087]} />
                    <Marker position={[38.024363, 23.753213]} /> */}
                </MarkerClusterGroup>
            </LeafletMap>
        </div>
    );

}

export default Map;



