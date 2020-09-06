import React, {useState, useEffect} from 'react';
import {Map as LeafletMap, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import SensorService from '../services/sensor-service';
import AuthService from '../services/authentication-service';
import {useHistory} from 'react-router-dom';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'), iconUrl: require('leaflet/dist/images/marker-icon.png'), shadowUrl: require('leaflet/dist/images/marker-shadow.png')});

function SensorRegistration() {

    const [zoomLvl, setZoomLvl] = useState(10);
    const [markerPosition, setMarkerPosition] = useState([37.968713, 23.729195]);
    const [userPosition, setUserPosition] = useState([37.968713, 23.729195]);
    const history = useHistory();

    function getGeolocation() {
        return (navigator.geolocation.getCurrentPosition(function(position) {
            setUserPosition([position.coords.latitude, position.coords.longitude]);
            // console.log(userPosition)
        }))
    }

    function handleClick(e) {
        // console.log(e.latlng);
        return setMarkerPosition(e.latlng);
    }

    // CHAT
    useEffect(() => {
        getGeolocation();
        // const chat = document.getElementById('userlike');
        // var script;
        // if (chat) {
        //     chat.classList.remove('d-none');
        // } else {
        //     script = document.createElement('script');
        //     script.src = "https://userlike-cdn-widgets.s3-eu-west-1.amazonaws.com/881d3b53a69dd16d6ffc7bcdbc10abdda9e12423c56b349d377f7fd6f12d2709.js";
        //     script.async = true;
        //     document.body.appendChild(script);
        // }
        // return (() => {
        //     const chat = document.getElementById('userlike');
        //     //document.body.removeChild(script);
        //     chat.classList.add('d-none');
        // })
    }, []);

    function getSoldSensorId() {
        const pathArray = window.location.pathname.split("/");
        const soldSensorId = pathArray[pathArray.length - 1]
        return soldSensorId;
    }

    function handleSubmit(e) {
        const sensorLabel = e.target.sensorLabel.value
        // console.log(sensorLabel)
        SensorService.registerSensor({soldSensorId: getSoldSensorId(), label: sensorLabel, lat: markerPosition.lat, lon: markerPosition.lng})
        .then(()=>{
            // console.log({soldSensorId: getSoldSensorId(), label: sensorLabel, lat: markerPosition.lat, lon: markerPosition.lng});
        })
        .catch((err)=>{
            // console.log(err);
        });
        e.preventDefault();
        history.push("/sensors");

    }

    return (<div className="container pt-5 pb-5">
        <div className="row d-flex justify-content-center mt-5 mb-5">
            <div className="col-10 col-md-7 shadow mt-5">
                <div className="row d-flex justify-content-center mt-3 mb-4">
                    <div className="col-12 text-center mt-3 mb-3">
                        <h5>Select your sensor location</h5>
                    </div>
                    <div className="col-12">
                        <LeafletMap onClick={handleClick} center={userPosition} zoom={zoomLvl} style={{
                                width: "100%",
                                height: "50vh",
                                zIndex: 5
                            }}>
                            <TileLayer attribution='Maps &nbsp;&copy;' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
                            <Marker position={markerPosition}></Marker>
                        </LeafletMap>
                        <form className="col-12 text-center mt-3 mb-3" id="login-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="sensorLabel"></label>
                                <input type="text" name="sensorLabel" id="sensorLabel" placeholder="Sensor label" className="form-control"/>
                            </div>
                        </form>
                        <div className="col-12 justify-content-center mt-3 mb-3">
                            <button type="submit" className="btn w-100 btn-primary" form="login-form">Done</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>);

}

export default SensorRegistration;
