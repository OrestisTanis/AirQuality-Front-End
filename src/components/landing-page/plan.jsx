import React from 'react';

function Plan(props) {

    return (
        <div className={props.className}>
            <div className="plan bg-white px-4 pt-4 pb-3">
                <h2 className="pb-3 pt-3">Free</h2>
                <p className="px-3">The FREE package for our community members.
                                Enhance your project with local air quality and weather data.</p>
                <button className="btn btn-primary mt-4 mb-5">START NOW</button>
                <p>Community-based support</p>
                <hr className="mt-5 mb-5" />
                <div className="row mt-3 mb-3 d-flex justify-content-center">
                    <div className="col-10 pl-0 d-flex justify-content-around">
                        <span>#</span><span>City name and coordinates</span>
                    </div>
                </div>
                <div className="row mt-3 mb-3 d-flex justify-content-center">
                    <div className="col-10 pl-0 d-flex justify-content-around">
                        <span>#</span><span>City name and coordinates</span>
                    </div>
                </div>
                <div className="row mb-3 d-flex justify-content-center">
                    <div className="col-10 pl-0 d-flex justify-content-around">
                        <span>#</span><span>City name and coordinates</span>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Plan;



