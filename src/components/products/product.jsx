import React from 'react';
import './product.css';

function Product() {
    return (
        <>
            <div className="col-9 col-sm-6 col-md-6 col-lg-4 col-xl-3 p-1">
                <div className="inner-container p-4 shadow border">
                    {/* <h5 className="text-center"> PM1.0 PM2.5 PM10 Detector Module Air Quality Dust Sensor </h5> */}
                    <img className="img-responsive product-image" src="https://p0n3.net/wp-content/uploads/2018/06/IMG_20180602_113301a.png" alt="PM2.5 PM10 Detector" />
                    <p className="product-title">PM1.0 PM2.5 PM10 Detector Module Air Quality Dust Sensor</p>
                    <div className="product-price mt-1">US $29.99 | EU &euro; 26.99</div>
                    <div className="mt-3">
                        <button type="button" className="btn btn-primary w-100 to-cart-button">Add to cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product;



