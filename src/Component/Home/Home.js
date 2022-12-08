import React from 'react';
import Bicycles from '../Bicycles/Bicycles';
import Reviews from '../Reviews/Reviews';
import Banner from '../Shared/Banner/Banner';
import Footer from '../Shared/Footer/Footer';
import WeBest from '../WeBest/WeBest';

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <Bicycles pageFrom="home"></Bicycles>
            <Reviews></Reviews>
            <WeBest></WeBest>
            <Footer></Footer>
        </>
    );
};

export default Home;