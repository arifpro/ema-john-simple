import React, { useContext } from 'react';
import './Cart.css'
// import { useAuth } from '../Login/useAuth';
// import { UserContext } from '../../App';


const Cart = (props) => {
    const cart = props.cart
    // const auth = useAuth()
    // console.log(auth.user);
    // const total = cart.reduce((total, product) => total + product.price, 0)
    let total = 0
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total += product.price * product.quantity
        // debugger
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
            <p>Product Price: ${formatNumber(total)}</p>
            <p><small>Shipping Cost: ${shipping}</small></p>
            <p><small>Tax+Vat: ${formatNumber(tax)}</small></p>
            <p>Total Price: ${grandTotal}</p> 
            <br/>
            {
                props.children
            }
            {/* <p>{user}</p> */}
        </div>
    );
};

export default Cart;