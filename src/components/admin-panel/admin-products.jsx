import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function AdminProducts() {
    const [isFirstRender, setIsFirstRender] = useState(true);
    // const [totalPrice, setTotalPrice] = useState(0);

    // Will run once after component load
    // useEffect(() => {
    //     getCartData();
    // }, []);

    //Will run once after component load
    // useEffect(() => {
    //     if (isFirstRender) setIsFirstRender(false);
    //     if (!isFirstRender) {
    //         let sum = 0;
    //         cartItems.forEach(cartItem => {
    //             sum += cartItem.product.price * cartItem.quantity;
    //         })

    //         setTotalPrice(sum);
    //     }

    // }, [cartItems]);

    return (
        <>
            ADMIN PRODUCTS
        </>
    )
}

export default AdminProducts;



