import React from 'react';

function CartItem(){
    


    return (
        <div className="col-12">
            <div id="cart-item-container">
                <div className="row">
                    <div className="col-3">
                        image
                    </div>
                    <div className="col-3">
                        product desc
                    </div>
                    <div className="col-3">
                        - + buttons
                    </div>
                    <div className="col-3">
                        totalPrice
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem;



