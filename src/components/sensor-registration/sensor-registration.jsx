import React, { useState } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

function SensorRegistration() {
    const [sensors, setSensors] = useState([
        { hasLocation: false, latlng: { lat: 51.505, lng: -0.09 } }
    ]);
    const [zoomLvl, setZoomLvl] = useState(13);
    const position = [sensors[0].lat, sensors[0].lng];
    const padTop = "4.78rem";
    const myIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12.5, 41],
        popupAnchor: [0, -41]
    })
    return (
        <div style={{ paddingTop: padTop }}>
            <LeafletMap center={position} zoom={zoomLvl} style={{ width: "100vw", height: `calc(100vh - ${padTop})`, zIndex: 5 }}>
                <TileLayer
                    attribution='Maps &nbsp;&copy;'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <Marker position={position} icon={myIcon}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
                </Marker>
            </LeafletMap>
        </div>
    );

}

export default SensorRegistration;



