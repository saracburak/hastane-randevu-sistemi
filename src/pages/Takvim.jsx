// Takvim.js
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Takvim = ({ doluGunler, doluSaatler, onDateChange, selectedDate }) => {
    // Günün tamamen dolu olup olmadığını belirlemek için
    const isDateFull = (date) => {
        const dateString = date.toISOString().split('T')[0];
        const allTimes = getAllTimes();
        const isFullyBooked = allTimes.every(time => doluSaatler[time]);
        return doluGunler.includes(dateString) && isFullyBooked;
    };

    // Saatlerin listesi
    const getAllTimes = () => {
        const allTimes = [];
        for (let hour = 9; hour <= 17; hour++) {
            allTimes.push(`${hour}:00`);
        }
        return allTimes;
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const dateString = date.toISOString().split('T')[0];
            if (dateString === selectedDate.toISOString().split('T')[0] && isDateFull(date)) {
                return 'bg-danger text-white'; // Tamamen dolu olan günler için kırmızı
            }
        }
        return null;
    };

    return (
        <Calendar
            onChange={onDateChange}
            value={selectedDate}
            tileClassName={tileClassName}
        />
    );
};

export default Takvim;
