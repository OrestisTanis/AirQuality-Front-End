import { useEffect, useState, useRef } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import useUserState from '../user-state';
import Error from '../errors/error';
import React from 'react';
import axios from 'axios';
import productService from "../services/product-service";
import './product-details.css';


export default function ProductDetails() {
    const { pathname } = useLocation();
    const history = useHistory()
    const [product, setProduct] = useState();
    const [errors, setErrors] = useState({});
    const [descSentencesArr, setDescSentencesArr] = useState([]);
    const [firstSentence, setFirstSentence] = useState("");
    const [techDetailsArr, setTechDetailsArr] = useState([]);
    const [userState, setUserState] = useUserState();
    const [selectedQuan, setSelectedQuan] = useState(0);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const username = userState.username;
    const [cartItem, setCartItem] = useState({ product: { id: 0, name: '', price: '', imageUrl: '' }, quantity: 0 });
   

    function setCartItemId(newId) {
        cartItem = { product: { id: newId }, quantity: 0 };
    }

    // Will run once after component load
    useEffect(() => {
       getProductData();
    }, []);

    function getProductData() {
        // pathname = /products/id, we need to get id
        const id = pathname.slice(pathname.lastIndexOf("/") + 1);
        // Go to the server || dispatch an action
        productService.getProductById(id)
            .then(res => {
                // Handle successful fetch of data
                const resData = res.data;
                //console.log(resData);
                const descSentenceArr = resData.description.split(";");
                const techDetailsArr = resData.technicalDetails.split(";");

                setProduct(resData);
                setDescSentencesArr(descSentenceArr);
                setFirstSentence(descSentenceArr[0].split('.')[0]);
                setTechDetailsArr(techDetailsArr);
                setCartItem({ product: { id: resData.id }, quantity: 0 });
                setInitialQuantityById(resData.id);
            }).catch(error => {
                // Handle errors
                const errors = {};
                if (error.response) {
                    const response = error.response.data;
                    errors.status = response.status;
                    errors.statusTxt = response.error;
                    errors.message = response.message;
                    setErrors(errors);
                }
                else {
                    errors.message = error.message;
                    setErrors(errors);
                }
            })
    }

    function setInitialQuantityById(id) {
        let storageCart = localStorage.getItem('cart');
        // Existent cart in local storage
        if (storageCart) {
            let storageCart = JSON.parse(localStorage.getItem('cart'));
            let storageCartItems = storageCart.cartItems;
            storageCartItems.forEach(storageCartItem => {
                // Item already added in cart
                if (storageCartItem.product.id === id) {
                    setSelectedQuan(storageCartItem.quantity)
                }
            });
        }
    }

    function addQuantity() {
        let oldQuan = selectedQuan;
        setSelectedQuan(++oldQuan);
    }

    function deductQuantity() {
        let oldQuan = selectedQuan;
        setSelectedQuan(--oldQuan);
    }

    // Will run once after component load
    useEffect(() => {
        if (isFirstRender === true) setIsFirstRender(false);

        if (isFirstRender === false) saveCartToLocalStorage();

    }, [selectedQuan]);

    function handleViewManual() {
        window.location.href = product.manualUrl;
    }

    function saveCartToLocalStorage() {
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
                    storageCartItem.product.imageUrl = product.imageUrl;
                    storageCartItem.product.price = product.price;
                    storageCartItem.product.name = product.name;
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
                cartItem.product.imageUrl = product.imageUrl;
                cartItem.product.price = product.price;
                cartItem.product.name = product.name;
                storageCartItems.push(cartItem);
            }
            let updatedCart = JSON.stringify(storageCart);
            localStorage.setItem("cart", updatedCart);
        }
        // No cart in local storage
        else {
            createNewCartAndSave();
        }

        function createNewCartAndSave() {
            let newCart = { cartItems: [] };
            cartItem.quantity = selectedQuan;
            cartItem.product.imageUrl = product.imageUrl;
            cartItem.product.price = product.price;
            cartItem.product.name = product.name;
            newCart.cartItems.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
    }

    return (<>
        {Object.keys(errors).length ? <Error errors={errors} /> :
            product ?
                <div style={{ paddingTop: "10rem" }}>
                    <div className="container pl-5 pr-5 pr-sm-0 pl-sm-0 pl-md-5 pr-md-5">
                        <div className="row">
                            <div className="col-12 col-sm-6  col-lg-6">
                                <div className="row">
                                    <div className="col-12 d-flex justify-content-center d-lg-block">
                                        <img id="product-details-image" className="img-responsive shadow" src={product.imageUrl} alt="product image" />
                                    </div>
                                    <div className="col-12 p-5">
                                        <h5>{product.name}</h5>
                                        <div className="border mt-4 mb-4" id='product-details-line'></div>
                                        <p style={{ maxWidth: "22rem" }}> {firstSentence}. </p>
                                    </div>
                                </div>
                            </div>
                            {/* In stock, cart, quantity buttons */}
                            <div className="col-12 col-sm-6 pr-0 pl-0">
                                <div className="shadow">
                                    <div className="col-12 w-100 pt-3 pb-3 ml-0 mr-0 text-center text-white" id="stock">
                                        <p>IN STOCK</p>
                                        <p>SHIPS IN 24 HOURS</p>
                                    </div>
                                    <div className="col-12 border-bottom border-right border-left pt-3 pb-3 text-center">
                                        <span id="product-details-price">Price:</span> <span id="product-details-price-number">&euro;{product.price}</span>
                                    </div>
                                    <div className="col-12">
                                        <div className="row text-center">
                                            {/* <div className="col-12 pt-3 pb-3 border-bottom border-right border-left pl-4 pr-3">
                                                <div className="row d-flex align-items-center">
                                                    <div className="col-4">
                                                        <button className="btn"><p className="fontsize-2" id="product-details-plus-button">+</p></button>
                                                    </div>
                                                    <div className="col-4">
                                                        <p className="fontsize-2" id="product-details-quantity">0</p>
                                                    </div>
                                                    <div className="col-4">
                                                        <button className="btn"><p className="fontsize-2" id="product-details-plus-button">-</p></button>
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div className="col-12 pt-3 pb-3 border-bottom border-right border-left d-flex align-items-center justify-content-center">
                                                {selectedQuan === 0 ? <button className="btn" id="product-details-add-to-cart-button" onClick={addQuantity}> Add To Cart </button>
                                                    : <>
                                                        <div className="col-4">
                                                            <button className="btn"><p className="fontsize-2" id="product-details-plus-button" onClick={addQuantity}>+</p></button>
                                                        </div>
                                                        <div className="col-4">
                                                            <p className="fontsize-2" id="product-details-quantity">{selectedQuan}</p>
                                                        </div>
                                                        <div className="col-4">
                                                            <button className="btn"><p className="fontsize-2" id="product-details-plus-button" onClick={deductQuantity}>-</p></button>
                                                        </div></>
                                                }
                                            </div>
                                            <div className="col-12 pt-3 pb-3 border-bottom border-right border-left">
                                                <span className="bold">FREE SHIPPING</span> for order over &euro;350
                                         </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="container-fluid shadow pl-md-5 pr-md-5 mt-5">
                        {/* Description */}
                        <div className="row bg-white pt-5 d-flex justify-content-center" style={{ bgColor: 'white' }}>
                            <div className="col-10 mb-5 mt-1" style={{ maxWidth: "68rem" }}>
                                <h4 className="mb-4">Description</h4>
                                {descSentencesArr.map((sentence, index) => {
                                    return index % 2 === 0 ? <div key={index}><p key={index}>{sentence}</p><br></br></div> : <p key={index}>{sentence}</p>;
                                })}
                            </div>
                        </div>

                        {/* Techical Details */}
                        <div className="row bg-white d-flex justify-content-center" style={{ bgColor: 'white' }}>
                            <div className="col-10 pb-4" style={{ maxWidth: "68rem" }}>
                                <h4 className="mb-4">Technical Details</h4>
                                <ul>
                                    {techDetailsArr.map((sentence, index) => {
                                        return index < techDetailsArr.length - 1 ? <li className="mb-1" key={index}>{sentence}</li> : null
                                    })}
                                </ul>
                            </div>
                            {/* View manual button */}
                            <div className="col-10 text-center">
                                <button className="mb-5 mt-5 btn btn-primary" onClick={handleViewManual}>View sensor manual</button>
                            </div>
                        </div>
                    </div>
                </div>
                : null
        }


    </>);
}
