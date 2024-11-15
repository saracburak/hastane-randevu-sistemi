// RandevuAl.js
import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Takvim from './Takvim';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';

function RandevuAl() {
    const [doktorlar, setDoktorlar] = useState([]);
    const [randevular, setRandevular] = useState([]);
    const [localRandevular, setLocalRandevular] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [randevuTarihi, setRandevuTarihi] = useState(new Date());
    const [randevuSaati, setRandevuSaati] = useState('');
    const [hastaAd, setHastaAd] = useState('');
    const [hastaSoyad, setHastaSoyad] = useState('');
    const [tcKimlikNo, setTcKimlikNo] = useState('');
    const [telefon, setTelefon] = useState('');
    const [doluGunler, setDoluGunler] = useState([]);
    const [doluSaatler, setDoluSaatler] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/data/doktorlar.json')
            .then(response => response.json())
            .then(data => setDoktorlar(data))
            .catch(error => console.error('Doktorlar yüklenirken hata oluştu:', error));
    }, []);

    useEffect(() => {
        const storedRandevular = JSON.parse(localStorage.getItem('randevular')) || [];
        setLocalRandevular(storedRandevular);

        const doluGunler = [...new Set(storedRandevular.map(randevu => randevu.tarih))];
        setDoluGunler(doluGunler);
    }, []);

    useEffect(() => {
        if (selectedDoctor && randevuTarihi) {
            const allRandevular = [...randevular, ...localRandevular];
            const selectedDoctorRandevular = allRandevular.filter(randevu =>
                randevu.doktorId === Number(selectedDoctor)
            );

            const selectedDateRandevular = selectedDoctorRandevular.filter(randevu =>
                randevu.tarih === randevuTarihi.toISOString().split('T')[0]
            );

            const doluSaatler = selectedDateRandevular.reduce((acc, randevu) => {
                acc[randevu.saat] = true;
                return acc;
            }, {});
            
            setDoluSaatler(doluSaatler);
        }
    }, [selectedDoctor, randevuTarihi, randevular, localRandevular]);

    const handleDoctorChange = (event) => {
        setSelectedDoctor(event.target.value);
        setRandevuTarihi(new Date());
        setRandevuSaati('');
    };

    const handleDateChange = (date) => {
        if (date instanceof Date && !isNaN(date)) {
            setRandevuTarihi(date);
            setRandevuSaati('');
        }
    };

    const handleSubmit = () => {
        const hastaId = Math.floor(Math.random() * 1000000);
        const yeniRandevu = {
            randevuId: (randevular.length + localRandevular.length + 1),
            doktorId: Number(selectedDoctor),
            hastaId,
            tarih: randevuTarihi.toISOString().split('T')[0],
            saat: randevuSaati,
            hastaAd: hastaAd,
            hastaSoyad: hastaSoyad,
            tcKimlikNo: tcKimlikNo,
            telefon: telefon
        };
    
        const updatedRandevular = [...randevular, ...localRandevular, yeniRandevu];
        setRandevular(updatedRandevular);
        setLocalRandevular([...localRandevular, yeniRandevu]);
        localStorage.setItem('randevular', JSON.stringify(updatedRandevular));
        alert('Randevunuz başarıyla alındı!');
        
        navigate('/randevular');
    };

    const isTimeDisabled = (time) => doluSaatler[time];

    const getAllTimes = () => {
        const allTimes = [];
        for (let hour = 9; hour <= 17; hour++) {
            allTimes.push(`${hour}:00`);
        }
        return allTimes;
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-5">Randevu Al</h1>
            <div className="mb-4">
                <Takvim
                    doluGunler={doluGunler}
                    doluSaatler={doluSaatler}
                    onDateChange={handleDateChange}
                    selectedDate={randevuTarihi}
                />
            </div>
            <Form>
                <FormGroup>
                    <Label for="doktorSelect">Doktor Seçin:</Label>
                    <Input type="select" id="doktorSelect" onChange={handleDoctorChange} value={selectedDoctor}>
                        <option value="">Doktor Seçin</option>
                        {doktorlar.map(doktor => (
                            <option key={doktor.id} value={doktor.id}>
                                {doktor.ad} {doktor.soyad} - {doktor.bolum}
                            </option>
                        ))}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="randevuSaati">Randevu Saatini Seçin:</Label>
                    <Input
                        type="select"
                        id="randevuSaati"
                        value={randevuSaati}
                        onChange={(e) => setRandevuSaati(e.target.value)}
                        disabled={!randevuTarihi || !selectedDoctor}
                    >
                        <option value="">Saat Seçin</option>
                        {getAllTimes().map(time => (
                            <option
                                key={time}
                                value={time}
                                className={isTimeDisabled(time) ? 'bg-danger text-white' : ''}
                                disabled={isTimeDisabled(time)}
                            >
                                {time}
                            </option>
                        ))}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="hastaAd">Hasta Adı:</Label>
                    <Input
                        type="text"
                        id="hastaAd"
                        value={hastaAd}
                        onChange={(e) => setHastaAd(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="hastaSoyad">Hasta Soyadı:</Label>
                    <Input
                        type="text"
                        id="hastaSoyad"
                        value={hastaSoyad}
                        onChange={(e) => setHastaSoyad(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="tcKimlikNo">TC Kimlik No:</Label>
                    <Input
                        type="text"
                        id="tcKimlikNo"
                        value={tcKimlikNo}
                        onChange={(e) => setTcKimlikNo(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="telefon">Telefon:</Label>
                    <Input
                        type="text"
                        id="telefon"
                        value={telefon}
                        onChange={(e) => setTelefon(e.target.value)}
                    />
                </FormGroup>
                <Button color="primary" onClick={handleSubmit}>Randevu Al</Button>
            </Form>
        </div>
    );
}

export default RandevuAl;
