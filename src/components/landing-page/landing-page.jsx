import React, { useState, useEffect } from 'react';
import MainFeature from './main-feature';
import SecondaryFeature from './secondary-feature';
import Plan from './plan';
import BackgroundVideo from './background-video';
import axios from 'axios';

function LandingPage() {
    const [plans, setPlans] = useState([]);

    // Will run once after component load
    useEffect(() => {
        getPlanData();
    }, []);

    function getPlanData() {
        // Go to the server || dispatch an action
        axios.get(`http://localhost:8080/plans`)
            .then(res => {
                // Handle successful call
                console.log(res.data);
                setPlans(res.data);
            }).catch(error => {
                // Handle invalid credentials
                if (error.message) {
                    console.log(error.message);
                    // const errors = {};
                    // errors.invalidCredentials = "Invalid username or password.";
                    // setErrors(errors);
                }
            })
    }


    return (
        <>
            <BackgroundVideo></BackgroundVideo>
            <div className="container-fluid" id="feature-div">
                <div className="container">
                    <div className="row text-center mt-5 mb-5 d-flex justify-content-center">
                        <div className="col-12">
                            <h2 className="mt-5 mb-4 pt-1">Accurate local air quality and visualized data</h2>
                        </div>
                        <MainFeature className="col-10 col-md-4 mt-5 mb-5" />
                    </div>
                    <hr />
                    <div className="row text-center d-flex justify-content-center mb-5">
                        <SecondaryFeature className="col-10 col-lg-6 mt-5 mb-5 p-0"></SecondaryFeature>
                    </div>
                </div>
                <div className="row text-center bg-gray pt-4 pb-5 pl-0 pr-0 d-flex justify-content-center">
                    <div className="col-12">
                        <h2 className="mb-5 pb-2 light-blue mt-5">Our available plans</h2>
                    </div>
                        {
                            plans.map((plan,index) => {
                                return <Plan className="col-10 col-md-6 col-lg-5 col-xl-4 mb-5" key={index} plan={plan}></Plan>
                            })
                        }
                </div>
            </div>
        </>
    )
}

export default LandingPage;



