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
    const [zoomLvl, setZoomLvl] = useState(16);
    const [position, setPosition] = useState([sensors[0].lat, sensors[0].lng]);
    const [markerPosition, setMarkerPosition] = useState([sensors[0].lat, sensors[0].lng]);
    const padTop = "4.78rem";

    const [userPosition, setUserPosition] = useState([15.968442, 15.729676])
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
        <div style={{ paddingTop: padTop }}>
            <LeafletMap onClick={handleClick} center={userPosition} zoom={zoomLvl} style={{ width: "100vw", height: `calc(100vh - ${padTop})`, zIndex: 5 }}>
                <TileLayer
                    attribution='Maps &nbsp;&copy;'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <Marker position={markerPosition}>
                </Marker>
            </LeafletMap>
        </div>
    );

}

export default SensorRegistration;



