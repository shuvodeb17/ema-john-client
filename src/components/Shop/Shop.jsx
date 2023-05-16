import "./Shop.css";
import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { addToDb, deleteShoppingCart, getShoppingCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [cart, setCart] = useState([]);

  const { totalProducts } = useLoaderData()


  /* useEffect(() => {
    fetch(`http://localhost:5000/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []); */

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:5000/products?pages=${currentPage}&limit=${itemsPerPage}`)
      const data = await response.json()
      setProducts(data)
    }
    fetchData();
  }, [currentPage, itemsPerPage]);

  // pagination start
  /**
  * 1. Determine the total number of item
  * 2. Decide on the number of items per page
  * 3. Calculate the total number of pages
  * 4. Determine the current page
  * 5. Load the appropriate data
  * 6. Display the data
  * 
 */

  /* useEffect(() => {
    fetch('http://localhost:5000/total-products')
      .then(res => res.json())
      .then(data => setCount(data.totalProducts))
  }, []) */

  const totalPages = Math.ceil(totalProducts / itemsPerPage)
  console.log(totalPages);

  /*  let pageNumbers = []
   for (let i = 0; i < totalPages; i++) {
     pageNumbers.push(i)
   } */

  const pageNumbers = [...Array(totalPages).keys()];
  const options = [5, 10, 20]

  function handleSelectChange(event) {
    setItemsPerPage(parseInt(event.target.value))
    setCurrentPage(0)
  }

  // pagination end




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
    const ids = Object.keys(shoppingCart)

    fetch(`http://localhost:5000/products-by-ids`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(ids)
    })
      .then(res => res.json())
      .then(cartProducts => {
        let savedCart = [];
        // step-1: get id
        for (const id in shoppingCart) {
          // step-2: get the product by using id
          const addedProduct = cartProducts.find((product) => product._id === id);
          // step-3: get quantity of the product
          if (addedProduct) {
            const quantity = shoppingCart[id];
            addedProduct.quantity = quantity;
            // step-4: add the addedProduct to the saved cart
            savedCart.push(addedProduct);
          }
        }
        setCart(savedCart);
      })
  }, []);

  return (
    <>
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

      <div className="pagination">
        <h1>Current Page: {currentPage + 1} And Items per page: {itemsPerPage}</h1>
        {
          pageNumbers.map(number => <button className={currentPage === number ? 'pagination-button btn btn-ghost selected' : 'pagination-button btn btn-ghost'}
            key={number}
            onClick={() => setCurrentPage(number)}
          >{number + 1}</button>)
        }
        <select value={itemsPerPage} onChange={handleSelectChange}>
          {options.map(option => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

    </>
  );
};

export default Shop;
