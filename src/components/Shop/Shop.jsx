import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addToDb, deleteShoppingCart, getShoppingCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddToCart = (product) => {
    let newCart = [];
    // 1. if product doesn't exists in the cart, then set quantity = 1;
    // 2. if exists update quantity by 1
    const exists = cart.find((pd) => pd._id === product._id);
    if (!exists) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exists.quantity = exists.quantity + 1;
      const remaining = cart.filter((pd) => pd._id !== product._id);
      newCart = [...remaining, exists];
    }

    setCart(newCart);
    addToDb(product._id);
  };

  const clearCartBtn = () => {
    setCart([]);
    deleteShoppingCart();
  }

  // local storage
  useEffect(() => {
    const shoppingCart = getShoppingCart();
    let savedCart = [];
    // step-1: get id
    for (const id in shoppingCart) {
      // step-2: get the product by using id
      const addedProduct = products.find((product) => product._id === id);
      // step-3: get quantity of the product
      if (addedProduct) {
        const quantity = shoppingCart[id];
        addedProduct.quantity = quantity;
        // step-4: add the addedProduct to the saved cart
        savedCart.push(addedProduct);
      }
    }
    setCart(savedCart);
  }, [products]);

  return (
    <div className="shop">
      <div className="container">
        <h1 className="text-4xl font-bold text-center mb-5 mt-5">
          Products: {products.length}
        </h1>
        <div className="shop-container">
          {/* product */}
          <div className="product">
            {products.map((product) => (
              <Product
                product={product}
                key={product._id}
                handleAddToCart={handleAddToCart}
              ></Product>
            ))}
          </div>

          {/* cart */}
          <div className="cart">
            <Cart cart={cart} clearCartBtn={clearCartBtn}>
              <Link to='/orders'>
                <button className="shop-button">Review order</button>
              </Link>
            </Cart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
