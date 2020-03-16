import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const [ cart, setCart ] = useState([])
    const [orderPlaced, setOrderPlaced] = useState(false)

    const handlePlaceOrder = () => {
        // console.log("place order");
        setCart([])
        setOrderPlaced(true)
        processOrder()
    }

    const removeProduct = (productKey) => {
        // console.log("remove clicked", productKey);
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)
    }

    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart)
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key===key)
            product.quantity = savedCart[key]
            return product
        })
        // console.log(cartProducts);
        setCart(cartProducts)
    }, [])

    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={happyImage} alt="" />
    } 
    return (
        <div className="twin-container">
            <div className="product-container">
                {/* <h1>Cart Items: {cart.length}</h1> */}
                {
                    cart.map(pd => <ReviewItem
                        key={pd.key}
                        removeProduct={removeProduct}
                        product={pd}></ReviewItem>)
                }
                { thankYou }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className="main-button">
                        <FontAwesomeIcon icon={faShoppingBag} /> Place Order
                    </button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;