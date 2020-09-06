import React, { useEffect, useState } from "react";
import { useLocation, Link, useHistory } from "react-router-dom";
import productService from "../services/product-service";
import productTypeService from "../services/product-type-service";
import $ from "jquery";


function AdminProduct() {
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [product, setProduct] = useState({});
    const [productTypes, setProductTypes] = useState([]);
    const [action, setAction] = useState("");
    const location = useLocation();
    const history = useHistory();
    const [productTypeId, setProductTypeId] = useState();
    let products = [];
    const { pathname } = useLocation();

    const starStyle = {
        color: "rgba(253, 17, 17, 0.7)"
    };
    const [errors, setErrors] = useState({});

    function SubmitForm(event) {
        event.preventDefault();
        const elements = event.currentTarget.elements;
        if (elements.id.value) {
            var id = parseInt(elements.id.value) || 0;
        }
        const productType = { id: elements.type.value };
        const name = elements.name.value;
        const description = elements.description.value;
        const technicalDetails = elements.technicalDetails.value;
        const price = elements.price.value;
        const imageUrl = elements.imageUrl.value;
        const manualUrl = elements.manualUrl.value;
        const type = elements.type.value;
        if (id){
            var product = { id, productType, description, technicalDetails, price, imageUrl, manualUrl, type, name };
        } 
        else{
            var product = { productType, description, technicalDetails, price, imageUrl, manualUrl, type, name };
        } 
        const errors = validateForm(product);
        setErrors(errors)
        if (!Object.keys(errors).length) {
            // const path = location.pathname;
            // const endOfPath = path.slice((path).lastIndexOf("/") + 1);
            setProduct(product);
            $('#adminProductCreateEditModal').modal('show')
        }
        else {
            // console.log("ERRORS");
        }
    }

    function handleApply(product){
        if (action === "Update"){
            productService.updateProduct(product);
            
        }
        else {
            productService.addProduct(product);
            
        }
        const path = "/admin";
        history.push(path);
        window.location.reload(true);
    }

    function validateForm(formData) {
        const errors = {}
        // Description
        if (!formData.description) errors.description = "Description is required";
        else if (formData.description.length < 25) errors.description = "Description must be at least 25 characters long";
        // Name
        if (!formData.name) errors.name = "Name is required";
        else if (formData.name.length < 5) errors.name = "Name must be at least 5 characters long";
        // Technical Details
        if (!formData.technicalDetails) errors.technicalDetails = "Technical Details are required";
        else if (formData.technicalDetails.length < 25) errors.technicalDetails = "Technical Details must be at least 25 characters long";
        // else if (!validateTDetails(formData.technicalDetails)) errors.technicalDetails = "Each technical detail in the text must be separated my semicolon(';').";
        // Price
        if (!formData.price) errors.price = "Price is required";
        else if (parseInt(formData.price) <= 0) errors.price = "Price must be a positive number.";
        // Image URL
        if (!formData.imageUrl) errors.imageUrl = "Image URL address is required";
        else if (!validateUrl(formData.imageUrl)) errors.imageUrl = "Not a valid url address";
        // Type
        if (!formData.type) errors.type = "Type is required";
        // Manual URL
        if (!formData.manualUrl) errors.manualUrl = "Manual URL address is required";
        else if (!validateUrl(formData.manualUrl)) errors.manualUrl = "Not a valid url address";
        console.log(errors);
        return errors;
    }
    function validateUrl(url) {
        const regex = RegExp(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/);
        return regex.test(String(url).toLowerCase());
    }

    // Will run once after component load
    useEffect(() => {
        const path = location.pathname;
        const endOfPath = path.slice((path).lastIndexOf("/") + 1);
        if (!isNaN(endOfPath)){
            getProductData();
            getProductTypes();
            setAction("Update");
        }
        else {
            getProductTypes();
            setProduct({});
            setAction("Add");
        }
    }, []);

    function getProductData() {
        const id = pathname.slice(pathname.lastIndexOf("/") + 1);
        // console.log(id);
        // Go to the server || dispatch an action
        productService.getProductById(id)
            .then(res => {
                // Handle successful fetch of data
                setProduct(res.data)                
                setProductTypeId(res.data.productType.id);
            }).catch(error => {
                // Handle errors
                if (error.message) {
                    // console.log(error.message);
                }
            })
    }

    function getProductTypes() {
        productTypeService.getAllProductTypes()
            .then(res => {
                // Handle successful fetch of data
                setProductTypes(res.data)
                
            }).catch(error => {
                // Handle errors
                if (error.message) {
                    // console.log(error.message);
                }
            })
            
    }

    return (
        <>
            <div className="container pt-5 pb-5">
                <div className="row d-flex justify-content-center mt-5 mb-5">
                    <div className="col-9 col-md-8 col-lg-6 shadow">
                        <div className="row d-flex justify-content-center mt-4 mb-4">
                            <div className="col-12 text-center mt-3 lead">
                                {action} Product
                    </div>
                            {/* {product.id ? */}
                                <>
                                    <div className="col-12">
                                        <form className="mt-4 mb-5" id="admin-product-form" onSubmit={SubmitForm}>
                                            <div className="row">
                                                <div className="form-group col-12 col-md-6 pr-md-1">
                                                    <label htmlFor="id">ID<span style={starStyle}>*</span></label>
                                                    <input type="text" name="id" id="id" className="form-control" defaultValue={product.id} readOnly />
                                                    <small className={(errors.id ? "show" : "hide") + " signup-errors"}>
                                                        {errors.id + ""}
                                                    </small>
                                                </div>
                                                <div className="form-group col-12 col-md-6 pl-md-1">
                                                    <label htmlFor="name">Name<span style={starStyle}>*</span></label>
                                                    <input type="text" name="name" id="name" className="form-control" defaultValue={product.name} />
                                                    <small className={(errors.name ? "show" : "hide") + " signup-errors"}>
                                                        {errors.name + ""}
                                                    </small>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="type">Type<span style={starStyle}>*</span></label>
                                                <select type="text" name="type" id="type" className="form-control">
                                                    {productTypes.map((ptype) => {
                                                        return <option key={ptype.id} selected={ptype.id === productTypeId? "selected" : ""} value={ptype.id}>{ptype.type}</option>
                                                    })}
                                                </select>
                                                <small className={(errors.type ? "show" : "hide") + " signup-errors"}>
                                                    {errors.type + ""}
                                                </small>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="description">Description<span style={starStyle}>*</span></label>
                                                <input type="text" name="description" id="description" className="form-control" defaultValue={product.description} />
                                                <small className={(errors.description ? "show" : "hide") + " signup-errors"}>
                                                    {errors.description + ""}
                                                </small>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="technicalDetails">Technical Details<span style={starStyle}>*</span></label>
                                                <input type="text" name="technicalDetails" id="technicalDetails" className="form-control" defaultValue={product.technicalDetails} />
                                                <small className={(errors.technicalDetails ? "show" : "hide") + " signup-errors"}>
                                                    {errors.technicalDetails + ""}
                                                </small>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="price">Price(&euro;)<span style={starStyle}>*</span></label>
                                                <input type="text" name="price" id="price" className="form-control" defaultValue={product.price} />
                                                <small className={(errors.price ? "show" : "hide") + " signup-errors"}>
                                                    {errors.price + ""}
                                                </small>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="imageUrl">Image URL<span style={starStyle}>*</span></label>
                                                <input type="text" name="imageUrl" id="imageUrl" className="form-control" defaultValue={product.imageUrl} />
                                                <small className={(errors.imageUrl ? "show" : "hide") + " signup-errors"}>
                                                    {errors.imageUrl + ""}
                                                </small>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="manualUrl">Manual URL<span style={starStyle}>*</span></label>
                                                <input type="text" name="manualUrl" id="manualUrl" className="form-control" defaultValue={product.manualUrl} />
                                                <small className={(errors.manualUrl ? "show" : "hide") + " signup-errors"}>
                                                    {errors.manualUrl + ""}
                                                </small>
                                            </div>
                                        </form>
                                        <div className="d-flex justify-content-center">
                                            <button type="submit" className="btn w-100 btn-primary" form="admin-product-form">Apply</button>
                                        </div>
                                    </div>

                                    {/* Modal */}
                                    <div className="modal fade" id="adminProductCreateEditModal" tabIndex="-1" role="dialog" aria-labelledby="adminProductCreateEditModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="adminProductCreateEditModalLabel">Apply Changes</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <p>{"Are you sure you want to " + action + " this product?"}</p>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                                    <button type="button" className="btn btn-primary" data-dismiss="modal" id="sign-out-button" onClick={()=>{handleApply(product)}}>Yes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                {/* :
                                null
                            } */}

                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}



export default AdminProduct;



