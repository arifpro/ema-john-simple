import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag, faCheck } from '@fortawesome/free-solid-svg-icons'
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart
    console.log(cart);
    // const total = cart.reduce((total, product) => total + product.price, 0)
    let total = 0
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total += product.price
    }

    let shipping = 0;
    if (total > 35) {
        shipping = 0
    }
    else if (total > 15) {
        shipping = 4.99
    }
    else if (total > 0) {
        shipping = 12.99
    }

    const tax = total * 0.1 //10%
    const grandTotal = (total + shipping + Number(tax)).toFixed(2)

    const formatNumber = num => {
        const precision = num.toFixed(2)
        return Number(precision)
    }

    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items ordered: {cart.length}</p>
            <p>Product Price: {formatNumber(total)}</p>
            <p><small>Shipping Cost: {shipping}</small></p>
            <p><small>Tax+Vat: {formatNumber(tax)}</small></p>
            <p>Total Price: {grandTotal}</p>    
            <button className="checkout-button"><FontAwesomeIcon icon={faShoppingBag} /> checkout</button>
        </div>
    );
};

export default Cart;