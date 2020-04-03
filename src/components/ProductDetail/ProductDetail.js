import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import { useEffect } from 'react';

const ProductDetail = () => {
    const {productKey} = useParams()
    const [product, setProduct] = useState([])
    // const product = fakeData.find(pd => pd.key === productKey)
    // console.log(product);

    useEffect(() => {
        fetch('http://localhost:4200/product' + productKey)
        .then(res => res.json())
        .then(data => {
            setProduct(data)
        })
    }, [productKey])  

    return (
        <div>
            <h1>Your Product Details.</h1>
            {
                product && <Product showAddToCart={false} product={product}></Product>
            }
        </div>
    );
};

export default ProductDetail;