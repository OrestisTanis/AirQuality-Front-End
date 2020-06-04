import React from 'react';
import {useHistory} from 'react-router-dom';

function LogOut() {
    const history = useHistory();

    function handleSignOut() {
        localStorage.removeItem("token");
        const path = "/";
        history.push(path);
    }

    return (
        <>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Signing Out</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to sign out?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={handleSignOut} data-dismiss="modal" id="sign-out-button" >Sign out</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LogOut;



