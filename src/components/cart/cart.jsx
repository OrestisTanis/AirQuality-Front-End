import React, { useEffect, useState } from "react";
import CartItem from './cart-item';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [isFirstRender, setIsFirstRender] = useState(true);

    // Will run once after component load
    useEffect(() => {
        getCartData();
    }, []);

    // Will run once after component load
    useEffect(() => {
        if (isFirstRender) setIsFirstRender(false);
        if (!isFirstRender) {
            console.log(cartItems);
        }
    }, [cartItems]);

    function getCartData() {
        let storageCart = localStorage.getItem('cart');
        // Existent cart in local storage
        if (storageCart) {
            let storageCart = JSON.parse(localStorage.getItem('cart'));
            setCartItems(storageCart.cartItems);
        }
    }

    return (
        <>
            <p style={{ paddingTop: '10rem' }}></p>
            <div className="container">
                <div className="row mb-5 pb-5">
                    <div className="col-12">
                        <h4>Shopping Cart</h4>
                    </div>
                    <div className="col-12 col-md-8">
                        {cartItems.map(item => {
                            return <CartItem cartItem={item}/>
                        })}
                    </div>
                    <div className="col-12 col-md-4">
                        Sum
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart;



