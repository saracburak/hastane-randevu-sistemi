import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Hastalar() {
    const [hastalar, setHastalar] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Yerel depolamadan randevuları al
        const storedRandevular = JSON.parse(localStorage.getItem('randevular')) || [];

        // Hastaları benzersiz kılmak için 'set' mantığı kullanıyoruz
        const uniqueHastalar = [];
        const seen = new Set();

        storedRandevular.forEach(randevu => {
            const hastaString = `${randevu.hastaAd}-${randevu.hastaSoyad}-${randevu.tcKimlikNo}-${randevu.telefon}`;
            if (!seen.has(hastaString)) {
                seen.add(hastaString);
                uniqueHastalar.push({
                    hastaAd: randevu.hastaAd,
                    hastaSoyad: randevu.hastaSoyad,
                    tcKimlikNo: randevu.tcKimlikNo,
                    telefon: randevu.telefon
                });
            }
        });

        setHastalar(uniqueHastalar);
    }, []);

    // Arama terimine göre filtreleme
    const filteredHastalar = hastalar.filter(hasta =>
        hasta.hastaAd.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hasta.hastaSoyad.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-5">Hastalar</h1>
            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Hasta adı veya soyadı ile arayın"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Ad</th>
                        <th>Soyad</th>
                        <th>TC Kimlik No</th>
                        <th>Telefon</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredHastalar.map((hasta, index) => (
                        <tr key={index}>
                            <td>{hasta.hastaAd}</td>
                            <td>{hasta.hastaSoyad}</td>
                            <td>{hasta.tcKimlikNo}</td>
                            <td>{hasta.telefon}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Hastalar;
