import React, { useState } from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Product = (props) => {
  const { img, name, price, seller, ratings } = props.product;

  return (
    <div className="product-container">
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img src={img} alt="product-image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title" title={name}>
            {name > 20 ? name : name.slice(0, 20)}
          </h2>
          <p>Price: ${price}</p>

          <div className="bottom">
            <p>
              <small>Manufacturer: {seller}</small>
            </p>
            <p>
              <small>Rating: {ratings}</small>
            </p>
          </div>
          <div className="card-actions justify-end">
            <button
              onClick={() => props.handleAddToCart(props.product)}
              className="btn btn-primary"
            >
              Add to Cart
              <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
