import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import './ReviewItem.css'

const ReviewItem = (props) => {
    console.log(props);
    const { name, quantity, key, price } = props.product
    return (
        <div className="review-item">
            <h4 className="product-name">{name}</h4>
            <p>Quantity: {quantity}</p>
            <p><small>${price}</small></p>
            <br />
            <button
                className="main-button"
                onClick={() => props.removeProduct(key)}
            ><FontAwesomeIcon icon={faTrash} /> Remove</button>
        </div>
    );
};

export default ReviewItem;