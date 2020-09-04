import React from 'react';
import poster from '../../shared/vid/cityPoster.png';
import vid from '../../shared/vid/city.mp4';
import './background-video.css'
import downArrow from '../../shared/img/down-arrow.png';

function BackgroundVideo(props) {
    function handleDownButtonClick() {
        //const featuresDiv = document.getElementById('feature-div');
        let height = 0;
        height = document.getElementById("image-poster").offsetHeight;
        if (height === 0) height = document.getElementById('video-bg').offsetHeight;
        const topPos = height;
        console.log(topPos);
        window.scrollTo(0, topPos + 3);
    }
    return (
        <>
            <video id="video-bg" poster={poster} autoPlay muted loop>
                <source src={"https://www.dropbox.com/s/5rq2e01773kpx0p/city.mp4?raw=1"} type="video/mp4" />
            </video>
            <div className="d-md-none">
                <img id="image-poster" src={poster} alt="" />
                <img src={downArrow} id="image-down-button" onClick={handleDownButtonClick} />
            </div>
            <img src={downArrow} id="image-down-button" onClick={handleDownButtonClick} />
            <div className="video-bg-overlay"></div>
            {/* SPACER */}
            <div id="spacer-100vh" style={{ height: "100vh" }}></div>
        </>
    )
}

export default BackgroundVideo;



