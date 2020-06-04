import React, { useEffect, useState } from 'react';
import './cart-item.css';

function CartItem(props) {
    const item = props.cartItem;
    const [selectedQuan, setSelectedQuan] = useState(item.quantity);
    const product = item.product;
    const [cartItem, setCartItem] = useState({ product: { id: product.id, name: product.name, price: product.name, imageUrl: product.image }, quantity: item.quantity });
    const [isFirstRender, setIsFirstRender] = useState(true);

    function addQuantity() {
        let oldQuan = selectedQuan;
        // console.log("CARTITEM FROM ADDQUAN", cartItem);
        //cartItem.product.quantity = selectedQuan;
        setSelectedQuan(++oldQuan);
    }

    function deductQuantity() {
        let oldQuan = selectedQuan;
        //product.quantity = selectedQuan;
        setSelectedQuan(--oldQuan);
    }

    function saveCartToLocalStorage() {
        let storageCart = JSON.parse(localStorage.getItem('cart'));
        let storageCartItems = storageCart.cartItems;
        storageCartItems.forEach(storageCartItem => {
            // Item already added in cart
            if (storageCartItem.product.id === product.id) {
                if (selectedQuan === 0) {
                    let index = storageCartItems.indexOf(storageCartItem);
                    storageCartItems.splice(index, index + 1);
                }
                else {
                    storageCartItem.quantity = selectedQuan;
                }
                props.setCartItems(storageCartItems);
            }
        });
        let updatedCart = JSON.stringify(storageCart);
        localStorage.setItem("cart", updatedCart);
    }

    // Will run once after component load
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
                            <h3 className="lead text-center" style={{ paddingTop: '1rem', fontWeight:'500' }}>{product.name}</h3>
                            <div className="row d-flex align-items-center mt-2 text-center">
                                <div className="col-3 offset-1">
                                    <button className="btn"><p className="lead scart-product-plus-button" onClick={addQuantity}>+</p></button>
                                </div>
                                <div className="col-3">
                                    <p className="lead scart-product-plus-button" style={{ paddingLeft: "1rem" }} id="product-details-quantity">{selectedQuan}</p>
                                </div>
                                <div className="col-3">
                                    <button className="btn"><p className="lead scart-product-plus-button" id="product-details-plus-button" onClick={deductQuantity}>-</p></button>
                                </div>
                                <div className="col-12">
                                <p style={{ paddingTop: "0.2rem", fontSize: "1.3rem" }} clasSName="lead text-center" >&euro;{(selectedQuan * product.price).toFixed(2)}</p>
                                </div>
                                
                            </div>

                        </div>
                        {/* <div className="col-6 d-flex align-items-center text-center pt-5 p-lg-0 mt-5">
                            <div className="col-4">
                                <button className="btn"><p className="lead scart-product-plus-button" onClick={addQuantity}>+</p></button>
                            </div>
                            <div className="col-4">
                                <p className="lead scart-product-plus-button" style={{paddingLeft: "1rem"}} id="product-details-quantity">{selectedQuan}</p>
                            </div>
                            <div className="col-4">
                                <button className="btn"><p className="lead scart-product-plus-button" id="product-details-plus-button" onClick={deductQuantity}>-</p></button>
                            </div>
                        </div>
                        <div className="col-6 d-flex align-items-center text-center pt-5 p-lg-0 mt-5 pl-5">
                            <p  style={{paddingTop:"0.2rem", fontSize:"1.3rem"}} clasSName="lead" >&euro;{(selectedQuan * product.price).toFixed(2)}</p>
                        </div> */}
                    </div>
                </div>
            </div>
        </div >

    )
}

export default CartItem;



