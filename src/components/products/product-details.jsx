import { useEffect, useState } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import React from 'react';
import axios from 'axios';
import './product-details.css';

export default function ProductDetails() {
    const { pathname } = useLocation();
    const history = useHistory()
    const [product, setProduct] = useState({});
    const [errors, setErrors] = useState({});
    const [descSentencesArr, setDescSentencesArr] = useState([]);
    const [firstSentence, setFirstSentence] = useState("");
    const [techDetailsArr, setTechDetailsArr] = useState([]);

    // Will run once after component load
    useEffect(() => {
        getProductData();
    }, []);

    function getProductData() {
        // Go to the server || dispatch an action
        axios.get(`http://localhost:8080${pathname}`)
            .then(res => {
                // Handle successful fetch of data
                const resData = res.data;
                setProduct(res.data);
                const descSentenceArr = resData.description.split(";");
                const techDetailsArr = resData.technicalDetails.split(";");
                setDescSentencesArr(descSentenceArr);
                setFirstSentence(descSentenceArr[0].split('.')[0]);
                setTechDetailsArr(techDetailsArr);
            }).catch(error => {
                console.log(error);
                // Handle errors
                if (error.message) {
                    const errors = {};
                    errors.message = error.message;
                    setErrors(errors);
                }
            })
    }

    return (<>
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
                                    <div className="col-12 pt-3 pb-3 border-bottom border-right border-left pl-4 pr-3">
                                        <div className="row d-flex align-items-center">
                                            <div className="col-4">
                                                <button className="btn"><p className="fontsize-2">+</p></button>
                                            </div>
                                            <div className="col-4">
                                                <p className="fontsize-2">1</p>
                                            </div>
                                            <div className="col-4">
                                                <button className="btn"><p className="fontsize-2">-</p></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 pt-3 pb-3 border-bottom border-right border-left">
                                        Add To Cart
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
                            return index % 2 === 0 ? <><p>{sentence}</p><br></br></> : <p>{sentence}</p>;
                        })}
                    </div>
                </div>

                 {/* Techical Details */}
                <div className="row bg-white d-flex justify-content-center" style={{ bgColor: 'white' }}>
                    <div className="col-10 pb-4" style={{ maxWidth: "68rem" }}>
                        <h4 className="mb-4">Technical Details</h4>
                        <ul>
                            {techDetailsArr.map((sentence, index) => {
                                return index < techDetailsArr.length - 1 ? <li className="mb-1">{sentence}</li> : null
                            })}
                        </ul>
                    </div>
                    <div className="col-10 text-center">
                        <Link className="mb-5 mt-5 btn btn-primary" to={product.manualUrl}>View sensor manual</Link>
                    </div>
                </div>
            </div>
        </div>
    </>);
}
