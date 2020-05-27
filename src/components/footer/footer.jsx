import React from 'react';
import SocialMediaIcon from './social-media-icon';
import facebook from '../../shared/icons/facebook.svg';
import linkedin from '../../shared/icons/linkedin.svg';
import youtube from '../../shared/icons/youtube.svg';
import twitter from '../../shared/icons/twitter.svg';

function Footer() {
    const iconsArr = [
        facebook, linkedin, youtube, twitter
    ]

    return (
        <>
            <div className="container-fluid bg-light-blue pt-5 pb-5">
                <div className="container text-white">
                    <div className="row pt-5 pb-5 d-flex justify-content-center">
                        <div className="col-6 text-center">
                            <h4>Partnership</h4>
                            <p className="mt-1">Become a Supplier</p>
                        </div>
                        <div className="col-6 text-center">
                            <h4>Company</h4>
                            <p className="mt-1">Careers</p>
                            <p>Contact Us</p>
                        </div>
                    </div>
                    <div className="row pb-5">
                        <div className="col text-white text-center">
                            &copy; Copyright 2020 AirSense. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid mt-5 mb-4">
                <div className="container text-center pt-5 pb-5">
                    <div className="row">
                        <div className="col-3">
                            <h4>Connect with AirSense</h4>
                        </div>
                        <div className="col-4 offset-5">
                            { iconsArr.map( icon => {
                                return <SocialMediaIcon icon={icon} className="ml-3"/>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;



