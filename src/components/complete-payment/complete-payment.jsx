import React from 'react';
import './complete-payment.css';
import $ from 'jquery';

function CompletePayment() {

  $(document).ready(function () {
    $("#myModal").modal('show');
  });

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <a href="#myModal" className="trigger-btn" data-toggle="modal"></a><br />
      <div class="text-center">
        <div style={{ paddingBottom: '10rem' }}>
          <h4><a href="./">Continue to breath yourself healthy..</a></h4>
        </div>
      </div>
      <div id="myModal" className="modal fade">
        <div className="modal-dialog modal-confirm">
          <div className="modal-content">
            <div className="modal-header">
              <div className="icon-box">
                <i className="material-icons">&#xE876;</i>
              </div>
              <h4 className="modal-title">Awesome!</h4>
            </div>
            <div className="modal-body">
              <p className="text-center">Your purchase has been confirmed. Check your email for detials.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-success btn-block" data-dismiss="modal">OK</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompletePayment;
