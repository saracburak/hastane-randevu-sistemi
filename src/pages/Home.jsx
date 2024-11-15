// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import Slider from '../components/Slider';
import DoktorSlider from '../components/DoktorSlider';

function Home() {
  const [doktorlar, setDoktorlar] = useState([]);

  useEffect(() => {
    fetch('/data/doktorlar.json')
      .then((response) => response.json())
      .then((data) => setDoktorlar(data))
      .catch((error) => console.error('Veriler yüklenirken hata oluştu:', error));
  }, []);

  return (
    <div>
      <Slider />
      <div className="container">
        <h1 className="text-center mt-5">Doktorlarımız</h1>
        <DoktorSlider doktorlar={doktorlar} />
      </div>
    </div>
  );
}

export default Home;
