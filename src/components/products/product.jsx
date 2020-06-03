import React from 'react';
import './product.css';
import { Link } from 'react-router-dom';

function Product(props) {
    const product = props.product;
   
    return (

        <>
            <div className="col-9 col-md-6 col-lg-5 col-xl-4 p-1">
                <div className="product-inner-container p-4 shadow border">
                    {/* <h5 className="text-center"> PM1.0 PM2.5 PM10 Detector Module Air Quality Dust Sensor </h5> */}
                    <img className="img-responsive product-image" src={product.imageUrl} alt={product.name} />
                    <p className="product-title mt-1">{product.name}</p>
                    <div className="product-price mt-1">EU &euro; {product.price}</div>
                    <p className="mt-2 text-center"><Link to={`/products/${product.id}`}>View details</Link></p>
                    <div className="mt-3">
                        <button type="button" className="btn btn-primary w-100 to-cart-button">Add to cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product;



