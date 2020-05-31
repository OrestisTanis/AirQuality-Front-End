import React, { isValidElement } from 'react';
import poster from '../../shared/vid/cityPoster.png';
import vid from '../../shared/vid/city.mp4';
import './background-video.css'

function BackgroundVideo(props) {

    return (
        <>
            <video id="video-bg" poster={poster} autoPlay muted loop>
                <source src={vid} type="video/mp4" />
            </video>
            <div className="d-md-none">
                <img id="image-poster" src={poster} alt="fresh air image"/>
            </div>
            <div className="video-bg-overlay"></div>
            {/* SPACER */}
            <div id="spacer-100vh" style={{height: "100vh"}}></div>
        </>
    )
}

export default BackgroundVideo;



