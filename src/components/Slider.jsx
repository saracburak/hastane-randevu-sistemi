import React, { useState, useEffect } from 'react';
import '../styles/Slider.css';

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "/slider/slider1.jpg",
    "/slider/slider2.jpg",
    "/slider/slider3.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Her 3 saniyede bir kaydır
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="main-slider">
      <div
        className="slider-wrapper"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slider ${index + 1}`}
            className="slider-image"
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
