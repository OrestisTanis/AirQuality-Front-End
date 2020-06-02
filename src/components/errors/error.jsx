import React from 'react';
import errorImg from '../../shared/img/errorImg.png';
import errorMessage from '../../shared/img/errorMessage.png';

function Error(props) {
    const errors = props.errors;

    return (
        <div className="container pl-5 pr-5  mb-0 pb-0 text-center" style={{ paddingTop: '10rem'}}>
            <div className="row mb-0 pb-0">
                <div className="col-12">
                    <h2>ERROR {errors.status} {errors.statusTxt }</h2>
                    <p className="mt-3" style={{fontSize: '1.3rem'}}>{errors.message}</p> 
                    <h4 className="mt-4">... and also carbon dioxide passed critical threshold</h4>
                </div>
            </div>
            <div className="row p-0" style={{ marginTop: '9rem' }}>
                <div className="col-12 pb-0 mb-0">
                    <img src={errorImg} alt="error image" style={{ maxWidth: '60vw', height: 'auto', width: "22.8125rem", objectFit: 'cover' }} />
                </div>
            </div>

        </div>

        // <div id="errorImg-container" className="container pl-5 pr-5  mb-0 pb-0 text-center" style={{ paddingTop: '10rem', minHeight: '100vh' }}>
        //     <div className="row mb-0 pb-0">
        //         <div className="col-12">
        //             <h2>ERROR#404</h2>
        //             <h4>... carbon dioxide passed critical threshold</h4>
        //         </div>
        //     </div>
        //     <img id="errorImg" src={errorImg} alt="error image" />
        // </div>
    )
}

export default Error;



