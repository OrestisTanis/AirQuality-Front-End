import React from 'react';
import Product from './product';

function Products() {
    

    return (
        <>
            <div style={{ paddingTop: '9rem' }}></div>
            <h2 className="text-center"> Our Products </h2>
            <div className="container">
                <div className="row mt-5 mb-5 d-flex justify-content-center p-3 p-sm-1 p-md-1">
                    <Product></Product>
                    <Product></Product>
                </div>
            </div>
        </>
    )
}

export default Products;



