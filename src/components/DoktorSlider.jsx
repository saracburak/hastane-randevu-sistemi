// src/components/DoktorSlider.jsx
import React, { useState } from 'react';
import '../styles/DoktorSlider.css';

function DoktorSlider({ doktorlar }) {
  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(doktorlar.length / itemsPerPage);

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : totalPages - 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages - 1 ? prevPage + 1 : 0));
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDoktorlar = doktorlar.slice(startIndex, endIndex);

  return (
    <div className="doktor-slider-container">
      <div className="doktor-slider">
        {currentDoktorlar.map((doktor) => (
          <div className="slide" key={doktor.id}>
            <div className="card">
              <img src={doktor.resim} className="card-img-top" alt={`${doktor.ad} ${doktor.soyad}`} />
              <div className="card-body">
                <h5 className="card-title">{doktor.ad} {doktor.soyad}</h5>
                <p className="card-text">{doktor.bolum}</p>
                <p className="card-text">{doktor.aciklama}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="slider-button prev" onClick={handlePrevClick}>
        &lt;
      </button>
      <button className="slider-button next" onClick={handleNextClick}>
        &gt;
      </button>
    </div>
  );
}

export default DoktorSlider;
