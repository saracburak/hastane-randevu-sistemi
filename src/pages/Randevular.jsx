import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Randevular() {
    const [randevular, setRandevular] = useState([]);

    useEffect(() => {
        // Yerel depolamadan randevuları al
        const storedRandevular = JSON.parse(localStorage.getItem('randevular')) || [];
        setRandevular(storedRandevular);
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-5">Randevular</h1>
            <Table striped>
                <thead>
                    <tr>
                        <th>Doktor Adı</th>
                        <th>Hasta Adı</th>
                        <th>Hasta Soyadı</th>
                        <th>TC Kimlik No</th>
                        <th>Telefon</th>
                        <th>Tarih</th>
                        <th>Saat</th>
                    </tr>
                </thead>
                <tbody>
                    {randevular.map((randevu, index) => (
                        <tr key={randevu.id || index}>
                            <td>{randevu.doktorAd}</td>
                            <td>{randevu.hastaAd}</td>
                            <td>{randevu.hastaSoyad}</td>
                            <td>{randevu.tcKimlikNo}</td>
                            <td>{randevu.telefon}</td>
                            <td>{randevu.tarih}</td>
                            <td>{randevu.saat}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default Randevular;
