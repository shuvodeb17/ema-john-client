import React, { useContext, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewProduct from '../ReviewProduct/ReviewProduct';
import './Orders.css';

const Orders = () => {
    const savedCart = useLoaderData();
    const [cart, setCart] = useState(savedCart)

    const { user } = useContext(AuthContext)


    const deleteBtn = id => {
        const remaining = cart.filter(item => item._id !== id);
        console.log(id);
        setCart(remaining);
        removeFromDb(id);
    }

    const clearCartBtn = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop'>
            <div className="container mx-auto">
                <div className="shop-container">
                    <div className="review">
                        {
                            cart.map(product => <ReviewProduct
                                product={product}
                                key={product._id}
                                deleteBtn={deleteBtn}
                            ></ReviewProduct>)
                        }
                    </div>
                    <div className="cart">
                        <Cart cart={cart} clearCartBtn={clearCartBtn}>
                            <Link to="/checkout" className='checkout-btn'>Processed Checkout</Link>
                        </Cart>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;