import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import Header from '../Header/Header';
import Shop from '../Shop/Shop';

const Home = () => {
    const navigation = useNavigation();
    return (
        <div>
            <Header></Header>
            <div className='mx-auto text-center text-5xl font-bold'>
                {
                     navigation.state === "loading" ? "loading" : ""
                }
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default Home;