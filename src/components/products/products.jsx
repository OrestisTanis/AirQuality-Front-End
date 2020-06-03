import React, {useEffect, useState} from 'react';
import Product from './product';
import axios from 'axios';
// import useUserState from '../user-state';

function Products() {
    const [productData, setProductData] = useState([]);
    const [errors, setErrors] = useState({});
    // const [userState, setUserState] = useUserState();

    // Will run once after component load
    useEffect(() => {
        getProductData();
        // console.log(userState.username);
    }, []);

    function getProductData(){
        // Go to the server || dispatch an action
        axios.get(`http://localhost:8080/products`)
        .then(res => {
            // Handle successful fetch of data
            console.log(res.data);
           const fetchedProducts = [];
           res.data.map(product => {
                fetchedProducts.push(product);
           });
           setProductData(fetchedProducts);

        }).catch(error => {
            console.log(error);
            // Handle errors
            if (error.message){
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
                <div className="row mt-5 mb-5 d-flex justify-content-center p-3 p-sm-1 p-md-1">
                    { productData.map(product => {
                        return <Product key={product.id} product={product}/>
                    })}
                </div>
            </div>
        </>
    )
}

export default Products;



