import React from 'react';
import Footer from "./footer";


function Home() {
    return (
        <div className="home-container">
            <div className="banner">
                <img src="src/assets/uzui.jpg" alt="Store Image" className="banner-image" />
                <div className="banner-text">
                    <h1>Welcome to Our Store</h1>
                    <p>Your one-stop shop for everything you need!</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;
