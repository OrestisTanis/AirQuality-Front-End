import React from 'react';
import poster from '../../shared/vid/cityPoster.png';
import vid from '../../shared/vid/city.mp4';
import './background-video.css'

function BackgroundVideo(props) {

    return (
        <>
            <video id="videoBG" poster={poster} autoPlay muted loop>
                <source src={vid} type="video/mp4" />
            </video>
            {/* SPACER */}
            <div style={{height: "100vh"}}></div>
        </>
    )
}

export default BackgroundVideo;



