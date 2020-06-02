import React, { useState } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

function SensorRegistration() {
    const [sensors, setSensors] = useState([
        { lat: 51.505, lng: -0.09 }
    ]);
    const [zoomLvl, setZoomLvl] = useState(10);
    // const [position, setPosition] = useState([sensors[0].lat, sensors[0].lng]);
    const [markerPosition, setMarkerPosition] = useState([sensors[0].lat, sensors[0].lng]);
    // const padTop = "4.78rem";

    const [userPosition, setUserPosition] = useState([37.968713, 23.729195])
    // const position = [sensors[0].lat, sensors[0].lng];
    // let userPosition = [15.968442, 15.729676];

    navigator.geolocation.getCurrentPosition(function (position) {
        setUserPosition([position.coords.latitude, position.coords.longitude]);
        console.log(userPosition)
    });

    function handleClick(e) {
        console.log(e.latlng);
        return setMarkerPosition(e.latlng);
    }

    return (
        <div className="container pt-5 pb-5">
            <div className="row d-flex justify-content-center mt-5 mb-5">
                <div className="col-7 shadow mt-5">
                    <div className="row d-flex justify-content-center mt-3 mb-4">
                        <div className="col-12 text-center mt-3 mb-3">
                            <h5>Select your sensor location</h5>
                        </div>
                        <div className="col-12">
                            <LeafletMap onClick={handleClick} center={userPosition} zoom={zoomLvl} style={{ width: "100%", height: "50vh", zIndex: 5 }}>
                                <TileLayer
                                    attribution='Maps &nbsp;&copy;'
                                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                                />
                                <Marker position={markerPosition}>
                                </Marker>
                            </LeafletMap>
                            <form className="col-12 text-center mt-3 mb-3" id="login-form">
                                <div className="form-group">
                                    <label htmlFor="sensorLabel"></label>
                                    <input type="text" name="sensorLabel" id="sensorLabel" placeholder="Sensor label" className="form-control" />
                                </div>
                            </form>
                            <div className="col-12 justify-content-center mt-3 mb-3">
                                <button type="submit" className="btn w-100 btn-primary" form="login-form">Done</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

}

export default SensorRegistration;



