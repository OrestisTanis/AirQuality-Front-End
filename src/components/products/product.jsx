import React, { useState, useEffect } from 'react';
import './product.css';
import { Link } from 'react-router-dom';
import useUserState from '../user-state';
import axios from 'axios';

function Product(props) {
    const product = props.product;
    const [userState, setUserState] = useUserState();
    const [selectedQuan, setSelectedQuan] = useState(0);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const username = userState.username;
    const [cartItem, setCartItem] = useState({ product: { id: 0, name: '', price: '', imageUrl: '' }, quantity: 0 });

    function addQuantity() {
        let oldQuan = selectedQuan;
        //cartItem.product.quantity = selectedQuan;
        setSelectedQuan(++oldQuan);
    }

    function deductQuantity() {
        let oldQuan = selectedQuan;
        //product.quantity = selectedQuan;
        setSelectedQuan(--oldQuan);
    }

    // Will run once after component load
    useEffect(() => {
        if (isFirstRender === true) {
            setInitialQuantity(product)
            setIsFirstRender(false);
            cartItem.product.id = product.id;
        }

        if (isFirstRender === false) saveCartToLocalStorage(product);

    }, [selectedQuan]);

    function setInitialQuantity(product) {
        let storageCart = localStorage.getItem('cart');
        // Existent cart in local storage
        if (storageCart) {
            let storageCart = JSON.parse(localStorage.getItem('cart'));
            let storageCartItems = storageCart.cartItems;
            storageCartItems.forEach(storageCartItem => {
                // Item already added in cart
                if (storageCartItem.product.id === product.id) {
                    setSelectedQuan(storageCartItem.quantity)
                }
            });
        }
    }

    function saveCartToLocalStorage(product) {
        let storageCart = localStorage.getItem('cart');

        // Existent cart in local storage
        if (storageCart) {
            let storageCart = JSON.parse(localStorage.getItem('cart'));
            let storageCartItems = storageCart.cartItems;
            let itemFound = false;
            storageCartItems.forEach(storageCartItem => {
                // Item already added in cart
                if (storageCartItem.product.id === product.id) {
                    storageCartItem.quantity = selectedQuan;
                    itemFound = true;
                    if (selectedQuan === 0) {
                        let index = storageCartItems.indexOf(storageCartItem);
                        storageCartItems.splice(index, index + 1);
                    }
                }
            });
            // Item not already added in cart, adding it now
            if (!itemFound) {
                cartItem.quantity = selectedQuan;
                cartItem.product.price = product.price;
                cartItem.product.name = product.name;
                cartItem.product.imageUrl = product.imageUrl;
                storageCartItems.push(cartItem);
            }
            let updatedCart = JSON.stringify(storageCart);
            localStorage.setItem("cart", updatedCart);
        }
        // No cart in local storage
        else {
            createNewCartAndSave(product);
        }

        function createNewCartAndSave(product) {
            let newCart = { cartItems: [] };
            cartItem.product.quantity = selectedQuan;
            cartItem.product.price = product.price;
            cartItem.product.name = product.name;
            cartItem.product.imageUrl = product.imageUrl;
            // console.log(cartItem);
            newCart.cartItems.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
    }

    // function saveToDb() {
    //     // Go to the server || dispatch an action
    //     axios.post(`http://localhost:8080/carts/${username}`, cart, {
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //             //Authorization: 'Bearer ' + token // if you use token
    //         }
    //     }).then(res => {
    //         // Handle successful fetch of data
    //         console.log(res.data);

    //     }).catch(error => {
    //         console.log(error);
    //         // Handle errors
    //         // if (error.message) {
    //         //     const errors = {};
    //         //     errors.message = error.message;
    //         //     setErrors(errors);
    //         // }
    //     })
    // }

    return (
        <>
            <div className="col-9 col-md-6 col-lg-5 col-xl-4 p-1">
                <div className="product-inner-container p-4 shadow border">
                    {/* <h5 className="text-center"> PM1.0 PM2.5 PM10 Detector Module Air Quality Dust Sensor </h5> */}
                    <img className="img-responsive product-image" src={product.imageUrl} alt={product.name} />
                    <p className="product-title mt-1">{product.name}</p>
                    <div className="product-price mt-1">EU &euro; {product.price}</div>
                    <p className="mt-2 text-center"><Link to={`/products/${product.id}`}>View details</Link></p>
                    <div className="mt-3 bg-success">
                        {selectedQuan === 0 ? <button type="button" className="btn w-100 to-cart-button text-white" onClick={addQuantity}>Add to cart</button>
                            :
                            <div className="row d-flex align-items-center text-center plus-minus-buttons">
                                <div className="col-4">
                                    <button className="btn" onClick={addQuantity}><p className="text-white" style={{ fontSize: '1.2rem' }} id="product-details-plus-button">+</p></button>
                                </div>
                                <div className="col-4">
                                    <p id="product-details-quantity" className="text-white" style={{ fontSize: '1.2rem' }} >{selectedQuan}</p>
                                </div>
                                <div className="col-4">
                                    <button className="btn" onClick={deductQuantity}><p id="product-details-plus-button" className="text-white" style={{ fontSize: '1.4rem' }} >-</p></button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product;



