import React, { useState } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Map() {
    const [sensors, setSensors] = useState([
        { lat: 51.505, lng: -0.09 }
    ]);
    const [zoomLvl, setZoomLvl] = useState(13);
    const position = [sensors[0].lat, sensors[0].lng];
    const padTop = "0rem";

    return (
        <div style={{paddingTop: padTop}}>
            <LeafletMap center={position} zoom={zoomLvl} style={{ width: "100vw", height: `calc(100vh - ${padTop})`, zIndex:-10 }}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
                </Marker>
            </LeafletMap>
        </div>
    );

}

export default Map;



