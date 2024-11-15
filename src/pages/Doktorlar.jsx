import React, { useState, useEffect } from 'react';

function Doktorlar() {
    const [doktorlar, setDoktorlar] = useState([]);

    useEffect(() => {
        fetch('public/data/doktorlar.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Doktor verileri:', data); // Verilerin yüklendiğini kontrol etmek için ekleyin
                setDoktorlar(data);
            })
            .catch((error) => console.error('Veriler yüklenirken hata oluştu:', error));
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-5">Doktorlar</h1>
            <div className="row">
                {doktorlar.map((doktor) => (
                    <div className="col-md-4 mb-4" key={doktor.id}>
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
        </div>
    );
}

export default Doktorlar;
