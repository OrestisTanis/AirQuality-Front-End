import React, { useEffect, useState } from 'react';
import './cart-item.css';
import { renderIntoDocument } from 'react-dom/test-utils';

function CartItem(props) {
    const item = props.cartItem;
    const [selectedQuan, setSelectedQuan] = useState(item.quantity);
    const product = item.product;
    const [isFirstRender, setIsFirstRender] = useState(true);

    function addQuantity() {
        let oldQuan = selectedQuan + 1;
        setSelectedQuan(oldQuan);
    }

    function deductQuantity() {
        let oldQuan = selectedQuan - 1;
        setSelectedQuan(oldQuan);
    }

    function saveCartToLocalStorage() {
        let storageCart = JSON.parse(localStorage.getItem('cart'));
        let storageCartItems = storageCart.cartItems;
        storageCartItems.forEach(storageCartItem => {
            // Item already added in cart
            if (storageCartItem.product.id === product.id) {
                if (selectedQuan <= 0) {
                    storageCartItem.quantity = 0;
                    let index = storageCartItems.indexOf(storageCartItem);
                    storageCartItems.splice(index, index + 1);
                    props.setCartItems(storageCartItems);
                    
                }
                else {
                    storageCartItem.quantity = selectedQuan;
                    props.setCartItems(storageCartItems);
                }
            }
        });
        let updatedCart = JSON.stringify(storageCart);
        localStorage.setItem("cart", updatedCart);
    }

    useEffect(() => {
        if (isFirstRender === true) setIsFirstRender(false);

        if (isFirstRender === false) saveCartToLocalStorage();

    }, [selectedQuan]);

    return (
        <div className="row mb-5 mt-5">
            <div className="col-12" >
                <div id="cart-item-container">
                    <div className="row ">
                        <div className="col-6 d-flex justify-content-center">
                            <img className="cart-product-img" src={product.imageUrl} alt="product image" />
                        </div>
                        <div className="col-6 pr-5" >
                            <h3 className="lead text-center" style={{ paddingTop: '1rem', fontWeight: '500' }}>{product.name}</h3>
                            <div className="row d-flex align-items-center mt-2 text-center">
                                <div className="col-3 offset-1 ">
                                    <button className="btn btn-success scart-product-button-container"><p className="lead scart-product-plus-button" onClick={addQuantity}>+</p></button>
                                </div>
                                <div className="col-3">
                                    <p className="lead" style={{ paddingLeft: "1rem" }} id="product-details-quantity">{item.quantity}</p>
                                </div>
                                <div className="col-3">
                                    <button className="btn btn-success scart-product-button-container"><p className="lead scart-product-plus-button" id="product-details-plus-button" onClick={deductQuantity}>-</p></button>
                                </div>
                                <div className="col-12">
                                    <p style={{ paddingTop: "0.2rem", fontSize: "1.3rem" }} className="lead text-center" >&euro;{(selectedQuan * product.price).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default CartItem;



