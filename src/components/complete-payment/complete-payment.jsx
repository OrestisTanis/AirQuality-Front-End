import React from 'react';
import './complete-payment.css';
import $ from 'jquery';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios'

function CompletePayment() {
<<<<<<< Updated upstream

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
=======
  $(document).ready(function(){
  $("#myModal").modal('show');
  });

  console.log(window.location.search);
  let queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const paymentId = urlParams.get('paymentId');
  const payerID = urlParams.get('PayerID');

  doPayment();

  function doPayment() {
      // Go to the server || dispatch an action

      axios.post(`http://localhost:8080/paypal/complete/payment?paymentId=${paymentId}&payerId=${payerID}`)
          .then(res => {
            console.log("Payment success..");
            console.log(res.data);
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

  return(
    <>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
    <a href="#myModal" className="trigger-btn" data-toggle="modal"></a><br/>
    <div class="text-center">
<div style={{paddingBottom:'10rem'}}>
<h4><a href="./">Continue to breathe yourself healthy..</a></h4>
</div>
</div>
<div id="myModal" className="modal fade">
<div className="modal-dialog modal-confirm">
  <div className="modal-content">
    <div className="modal-header">
      <div className="icon-box">
        <i className="material-icons">&#xE876;</i>
>>>>>>> Stashed changes
      </div>
    </>
  );
}

export default CompletePayment;
