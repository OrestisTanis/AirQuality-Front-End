import React from 'react';
import MainFeature from './main-feature';
import SecondaryFeature from './secondary-feature';
import Plan from './plan';
import BackgroundVideo from './background-video';


function LandingPage() {
    return (
        <>  
            <BackgroundVideo></BackgroundVideo>
            <div className="container-fluid">
                <div className="container">
                    <div className="row text-center mt-5 mb-5">
                        <MainFeature className="col-12 col-md-4 mt-5 mb-5" />
                        <MainFeature className="col-12 col-md-4 mt-5 mb-5" />
                        <MainFeature className="col-12 col-md-4 mt-5 mb-5" />
                    </div>
                    <hr />
                    <div className="row text-center d-flex justify-content-center pl-3 pr-3 m-5">
                        <SecondaryFeature className="col-8 col-lg-6 mt-5 mb-5"></SecondaryFeature>
                        <SecondaryFeature className="col-8 col-lg-6 mt-5 mb-5"></SecondaryFeature>
                    </div>
                </div>
                <div className="row text-center bg-gray pt-4 pb-5 pl-5 pr-5 d-flex justify-content-center">
                    <div className="col-12">
                        <h2 className="mb-5 pb-2 light-blue mt-5">Our available plans</h2>
                    </div>
                    <Plan className="col-10 col-md-6 col-lg-5 col-xl-3 mb-5"></Plan>
                    <Plan className="col-10 col-md-6 col-lg-5 col-xl-3 mb-5"></Plan>
                </div>
            </div>
        </>
    )
}

export default LandingPage;



