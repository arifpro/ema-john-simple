import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props);
    // const productName = props.product.name
    // const productImg = props.product.img
    const { img, name, seller, price, stock, key } = props.product
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
    <h4 className="product-name"><Link to={"/product/"+key}>{name}</Link></h4>
                <br />
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <br />
                <p><small>Only {stock} left in stock - Order soon</small></p>
                {
                    props.showAddToCart && <button 
                        className="main-button"
                        onClick={() => props.handleAddProduct(props.product)}
                        >
                        <FontAwesomeIcon icon={faCartPlus} /> add to cart
                    </button>
                }
            </div>
        </div>
    );
};

export default Product;