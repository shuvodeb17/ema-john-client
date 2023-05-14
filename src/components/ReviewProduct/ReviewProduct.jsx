import React from 'react';
import './ReviewProduct.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


const ReviewProduct = ({ product, deleteBtn }) => {
    const {_id, img, name, price, quantity } = product
    return (
        <div className='review-product flex items-center'>
            <img src={img} alt="" />
            <div className="review-product-main flex justify-between">
                <div className="left">
                    <h3 className="text-1xl">{name}</h3>
                    <p>Price: ${price}</p>
                    <p>Order Quantity: {quantity}</p>
                </div>
                <div onClick={() => deleteBtn(_id)} className="right-review">
                    <FontAwesomeIcon className='trash' icon={faTrash} />
                </div>
            </div>
        </div>
    );
};

export default ReviewProduct;