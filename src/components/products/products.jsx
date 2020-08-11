import React, { useEffect, useState } from 'react';
import Product from './product';
import axios from 'axios';
import productService from "../services/product-service";
// import useUserState from '../user-state';

function Products() {
    const [productData, setProductData] = useState([]);
    const [errors, setErrors] = useState({});

    // Will run once after component load
    useEffect(() => {
        getProductData();
    }, []);

    function getProductData() {
        // Go to the server || dispatch an action
        productService.getAllProducts()
            .then(res => {
                // Handle successful fetch of data
                const fetchedProducts = [];
                res.data.map(product => {
                    fetchedProducts.push(product);
                });
                setProductData(fetchedProducts);
            }).catch(error => {
                // Handle errors
                if (error.message) {
                    const errors = {};
                    errors.message = error.message;
                    setErrors(errors);
                }
            })
    }

    return (
        <>
            <div style={{ paddingTop: '9rem' }}></div>
            <h2 className="text-center"> Our Products </h2>
            <div className="container">
                {productData === [] ?
                    // Spinner
                    <div class="d-flex justify-content-center mt-5 mb-5">
                        <div class="spinner-border text-success" role="status" style={{ width: "5rem", height: "5rem" }}>
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                    :
                    // Products
                    <div className="row mt-5 mb-5 d-flex justify-content-center p-3 p-sm-1 p-md-1">
                        {productData.map(product => {
                            return <Product key={product.id} product={product} />
                        })}
                    </div>
                }
            </div>
        </>
    )
}

export default Products;
