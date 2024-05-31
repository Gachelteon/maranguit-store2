import React, { useState, useEffect } from 'react';
import Footer from './footer';

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    'src/assets/uzui.jpg',
    'src/assets/tancorps.jpg',
    'src/assets/hashiras.jpeg',
    'src/assets/hashiras2.png'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="home-container">
      <div className="banner">
        <div className="banner-image-container" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((src, index) => (
            <img key={index} src={src} alt={`Store Image ${index + 1}`} className="banner-image" />
          ))}
        </div>
        <div className="banner-text">
          <h1>Welcome to Our Store</h1>
          <p>Your one-stop shop for everything you need!</p>
        </div>
        <div className="loading-indicator">
          {images.map((_, index) => (
            <div key={index} className={`dot ${index === currentIndex ? 'active' : ''}`}></div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
