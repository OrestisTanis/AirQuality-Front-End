import React from 'react';
import {useHistory, Link} from 'react-router-dom';

function SignUpSuccess() {
    const history = useHistory();

    return (
        <>
            <div className="container" style={{paddingTop: '13rem', paddingBottom: '10rem'}}>
                <div className="row">
                    <div className="col-12 text-center">
                        <h3>Account registration successful!</h3>
                        <h5 className="mt-4">Thank you for registering in our website!</h5>
                    </div>
                    <div className="col-12 d-flex justify-content-center mt-3 mb-5">
                        <button type="button" className="btn btn-primary" data-dismiss="modal" id="sign-out-button"><Link to="/login" className="text-white">Login</Link></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUpSuccess;



