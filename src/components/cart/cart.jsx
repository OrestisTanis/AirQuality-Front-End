import React, { useEffect, useState } from "react";
import CartItem from './cart-item';


function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);

    // Will run once after component load
    useEffect(() => {
        getCartData();
    }, []);

    //Will run once after component load
    useEffect(() => {
        if (isFirstRender) setIsFirstRender(false);
        if (!isFirstRender) {
            let sum = 0;
            cartItems.forEach(cartItem => {
                sum += cartItem.product.price * cartItem.quantity;
            })
           
            setTotalPrice(sum);
        }
        
    }, [cartItems]);

    function addQuantity(index) {
        cartItems[index].quantity++;
    }

    function deductQuantity(index) {
        cartItems[index].quantity--;
    }

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
            <div className="container p-5" >
                <div className="row mb-5 pb-5">
                    <div className="col-12 mb-5">
                        <h2>Shopping Cart</h2>
                    </div>
                    <div className="col-12 col-lg-7">
                        {cartItems.map((item, index) => {
                            return <><CartItem cartItem={item} setCartItems={setCartItems} /> {index < cartItems.length - 1 ? <hr /> : null}</>
                        })}

                    </div>
                    <div className="col-12 col-lg-5  sum-item-price-container pb-5 pl-5 pr-5 pr-lg-0 mt-5 mt-lg-0">
                        <div className="shadow p-lg-1 pb-1">
                            <p className="text-center pt-3 lead">Sum</p>
                            <hr />

                            {cartItems.map((item, index) => {
                                return <><div style={{ position: 'relative' }}>
                                    <p className="text-center pt-3 lead sum-item-price">{index === cartItems.length - 1 && <span id="sum-item-minus">+</span>}{item.product.price} x {cartItems[index].quantity}<span className="item-quantity-multiply">{(item.product.price * cartItems[index].quantity).toFixed(2)}</span></p>
                                </div></>
                            })}
                            <hr />
                            <div style={{ position: 'relative' }} className="text-center pb-5">
                                <span className="lead sum-total-price-label">total</span><span className="lead sum-total-price">{totalPrice.toFixed(2)}</span>
                            </div>

                            <div className="col-12 text-center mt-5 mb-5">
                                <button className="btn btn-primary">Proceed to checkout</button>
                            </div>
                        </div>


                    </div>




                </div>
            </div>
        </>
    )
}

export default Cart;



