import React, { useEffect, useState } from 'react';
import '../../shared/css/validation-errors.css';
import axios from 'axios';


function Order(){
  const [cartItems, setCartItems] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [discount, setDiscount] = useState(5);
  const [errors, setErrors] = useState({});
  const finalSum = ((totalPrice-(discount*totalPrice)/100)).toFixed(2);

  function handlePayment(event) {
      event.preventDefault();
      const elements = event.currentTarget.elements;
      const firstName = elements.firstName.value;
      const lastName = elements.lastName.value;
      const country = elements.country.value;
      const address = elements.address.value;
      const zip = elements.zip.value;
      const email = elements.email.value;
      const prefecture = elements.prefecture.value;
      const errors = validateForm({ firstName, lastName, country, address, zip, email, prefecture });
      setErrors(errors)
      if (!Object.keys(errors).length) {
          doPaypal();
      }
  }

  function validateName(name) {
      const regex = RegExp("(^([a-zA-Z]+)$|^([α-ωΑ-Ω]+)$)");
      return regex.test(String(name));
  }

  function validateEmail(email) {
    const regex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regex.test(String(email).toLowerCase());
  }

  function validateZip(zip){
    const regex = RegExp("^[0-9]+$");
    return regex.test(String(zip).toLowerCase());
  }

  function validateForm(formData) {
      const errors = {}
      // FirstName
      if (!formData.firstName) errors.firstName = "First name is required";
      else if (formData.firstName.length < 3) errors.firstName ="First name must be at least 3 characters long";
      else if (!validateName(formData.firstName)) errors.firstName = "First name must be comprised either by english or greek characters";
      // LastName
      if (!formData.lastName) errors.lastName = "Last name is required";
      else if (formData.lastName.length < 3) errors.lastName ="Last name must be at least 3 characters long";
      else if (!validateName(formData.lastName)) errors.lastName = "Last name must be comprised either by english or greek characters.";
      // Country
      if (!formData.country) errors.country = "Country is required";
      // Address
      if (!formData.address) errors.address = "Address is required";
      else if (formData.address.length < 3) errors.address ="Address must be at least 3 characters long";
      else if (!validateName(formData.address)) errors.address = "Address must be comprised either by english or greek characters.";
      // Zip
      if (!formData.zip) errors.zip = "Zip code is required";
      else if (!validateZip(formData.zip)) errors.zip = "Zip code must contain only numbers";
      else if ((formData.zip).toString().length < 3) errors.address ="Zip code must be at least 3 digits long";
      // prefecture
      if (!formData.prefecture) errors.prefecture = "Prefecture is required";
      else if (formData.prefecture.length < 3) errors.prefecture ="Prefecture must be at least 3 characters long";
      else if (!validateName(formData.prefecture)) errors.prefecture = "Prefecture must be comprised either by english or greek characters.";
      // Email
      if (!validateEmail(formData.email)) errors.email = "Not a valid email address";
      return errors;
  }

  function doPaypal() {
      // Go to the server || dispatch an action

      axios.post(`http://localhost:8080/paypal/make/payment?sum=${finalSum}`)
          .then(res => {
            // console.log("Payment success..");
            // console.log(finalSum);
            // console.log(res.data);
            const redirectUrl = res.data.redirect_url;
            window.location.href = redirectUrl;
          }).catch(error => {
              // Handle invalid credentials
              if (error.message) {
                  // console.log(error.message);
                  // const errors = {};
                  // errors.invalidCredentials = "Invalid username or password.";
                  // setErrors(errors);
              }
          })
  }

  useEffect(() => {
      getCartData();
  }, []);

  useEffect(() => {
      if (isFirstRender) setIsFirstRender(false);
      if (!isFirstRender) {
          let sum = 0;
          let totalQuan =0;
          cartItems.forEach(cartItem => {
              sum += cartItem.product.price * cartItem.quantity;
              totalQuan += cartItem.quantity;
          })

          setTotalPrice(sum);
          setTotalQuantity(totalQuan);
      }

  }, [cartItems]);

  function getCartData() {
      let storageCart = localStorage.getItem('cart');
      // Existent cart in local storage
      if (storageCart) {
          let storageCart = JSON.parse(localStorage.getItem('cart'));
          setCartItems(storageCart.cartItems);
      }
  }

  return(
    <>
    <div className="container" style={{paddingTop:'12rem'}}>
  <div className="row">
    <div className="col-md-4 order-md-2 mb-4">
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">Your cart</span>
        <span className="badge badge-secondary badge-pill">{totalQuantity}</span>
      </h4>
      <ul className="list-group mb-3">
        {cartItems.map(cartItem => {
          return(
            <li className="list-group-item d-flex justify-content-between lh-condensed">
              <div>
                <h6 className="my-0">{cartItem.product.name}</h6>
                <small className="text-muted">qty: {cartItem.quantity}, unit price {cartItem.product.price}</small>
              </div>
              <span className="text-muted">{(cartItem.quantity*cartItem.product.price).toFixed(2)}</span>
            </li>
          );
        })}
        <li className="list-group-item d-flex justify-content-between bg-light">
          <div className="text-success">
            <h6 className="my-0">Discount offer {discount}%</h6>
            <small></small>
          </div>
          <span className="text-success">{((discount*totalPrice)/100).toFixed(2)}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Total (EUR)</span>
          <strong>&euro;{finalSum}</strong>
        </li>
      </ul>
    </div>

    <form onSubmit={handlePayment} className="col-md-8 order-md-1">
    <div>
      <h4 className="mb-3">Billing address</h4>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label for="firstName">First name</label>
            <input type="text" className="form-control" id="firstName" name="firstName" placeholder=""/>
            <small className={(errors.firstName ? "show" : "hide") + " signup-errors"}>
                {errors.firstName + ""}
            </small>
          </div>
          <div className="col-md-6 mb-3">
            <label for="lastName">Last name</label>
            <input type="text" className="form-control" id="lastName" name="lastName" placeholder=""/>
            <small className={(errors.lastName ? "show" : "hide") + " signup-errors"}>
                {errors.lastName + ""}
            </small>
          </div>
        </div>
        <div className="mb-3">
          <label for="email">Email <span class="text-muted">(Optional)</span></label>
          <input type="email" className="form-control" id="email" name="email" placeholder="you@example.com"/>
          <small className={(errors.email ? "show" : "hide") + " signup-errors"}>
              {errors.email + ""}
          </small>
        </div>

        <div className="mb-3">
          <label for="address">Address</label>
          <input type="text" className="form-control" id="address" name="address" placeholder="1234 Main St"/>
          <small className={(errors.address ? "show" : "hide") + " signup-errors"}>
              {errors.address + ""}
          </small>
        </div>

        <div className="row">
          <div className="col-md-5 mb-3">
            <label for="country">Country</label>
            <select className="custom-select d-block w-100" id="country" name="country">
              <option value="">Choose...</option>
              <option>Greece</option>
              <option>Cyprus</option>
            </select>
            <small className={(errors.country ? "show" : "hide") + " signup-errors"}>
                {errors.country + ""}
            </small>
          </div>
          <div className="col-md-4 mb-3">
          <label for="prefecture">Prefecture</label>
          <input type="text" className="form-control" id="prefecture" name="prefecture" placeholder=""/>
          <small className={(errors.prefecture ? "show" : "hide") + " signup-errors"}>
              {errors.prefecture + ""}
          </small>
          </div>
          <div className="col-md-3 mb-3">
            <label for="zip">Zip</label>
            <input type="text" className="form-control" id="zip" name="zip" placeholder=""/>
            <small className={(errors.zip ? "show" : "hide") + " signup-errors"}>
                {errors.zip + ""}
            </small>
          </div>
        </div>
        <hr className="mb-4"/>
        <div className="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input" id="same-address"/>
          <label className="custom-control-label" for="same-address">Shipping address is the same as my billing address</label>
        </div>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input" id="save-info"/>
          <label className="custom-control-label" for="save-info">Save this information for next time</label>
        </div>
        <hr className="mb-4"/><br/>
        <button className="btn btn-warning btn-lg btn-block text-white" type="submit" >Connect with paypal</button>
    </div>
    </form>
  </div>
  <footer className="my-5 pt-5 text-muted text-center text-small">
    <p className="mb-1"></p>
    <ul className="list-inline">
      <li className="list-inline-item"><a href="#"></a></li>
      <li className="list-inline-item"><a href="#"></a></li>
      <li className="list-inline-item"><a href="#"></a></li>
    </ul>
  </footer>
</div>
    </>

  );
}

export default Order;
