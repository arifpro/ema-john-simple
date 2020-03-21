import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0, 10)
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    const [count, setCount] = useState(0)
    // console.log(count);

    // useEffect()

    useEffect(() => {
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart)
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey)
            product.quantity = savedCart[existingKey]
            return product
        })
        // console.log("getData");
        setCart(previousCart)
    }, [count])


    const handleAddProduct = (product) => {
        const toBeaddedKey = product.key
        const sameProduct = cart.find(pd => pd.key === toBeaddedKey);
        let count = 1
        let newCart
        if (sameProduct) {
            count = sameProduct.quantity + 1
            sameProduct.quantity = count
            const others = cart.filter(pd => pd.key !== toBeaddedKey)
            newCart = [...others, sameProduct]
        } else {
            product.quantity = 1
            newCart = [...cart, product]
        }
        // console.log(newCart);
        setCart(newCart);
        addToDatabaseCart(product.key, count)
    }

    return (
        <div className="twin-container">
            <div className="product-container">
                {/* <h1><button onClick={() => setCount(count+1)}>Count: {count}</button></h1> */}

                {
                    products.map(product => <Product
                        key={product.key}
                        count={count}
                        showAddToCart={true}
                        handleAddProduct={handleAddProduct}
                        product={product}></Product>)
                }

            </div>
            <div className="cart-container">
                {/* <h3>This is cart</h3>
                <h5>Order Summary: {cart.length}</h5> */}
                <Cart count={count} cart={cart}>
                    <Link to="/review">
                        <button className="checkout-button">
                            <FontAwesomeIcon icon={faShoppingCart} /> Review Order
                        </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;