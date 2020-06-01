import React, { useState } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MarkerClusterGroup from "react-leaflet-markercluster";
import 'react-leaflet-markercluster/dist/styles.min.css';
import icon from 'leaflet/dist/images/marker-icon.png';

function Map() {
    const [sensors, setSensors] = useState([
        { lat: 37.968442, lng: 23.729676 }
    ]);
    const [zoomLvl, setZoomLvl] = useState(12);
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
                <MarkerClusterGroup>
                    <Marker position={[37.973449, 23.722204]} icon={myIcon} />
                    <Marker position={[37.973991, 23.726155]} icon={myIcon} />
                    <Marker position={[37.961608, 23.704598]} icon={myIcon} />
                    <Marker position={[37.973407, 23.723118]} icon={myIcon} />
                    <Marker position={[37.970295, 23.720455]} icon={myIcon} />
                    <Marker position={[37.979741, 23.732606]} icon={myIcon} />
                    <Marker position={[37.982380, 23.730974]} icon={myIcon} />
                    <Marker position={[38.011921, 23.764087]} icon={myIcon} />
                    <Marker position={[38.024363, 23.75321]} icon={myIcon} />
                </MarkerClusterGroup>
            </LeafletMap>
        </div>
    );

}

export default Map;



