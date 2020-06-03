import React from 'react';
import CartItem from './cart-item';

function Cart(){
    return (
        <>
        <p style={{paddingTop:'5rem'}}></p>
        <div className="container">
            <div className="row">
                <CartItem></CartItem>
            </div>
        </div>
        </>
    )
}

export default Cart;



