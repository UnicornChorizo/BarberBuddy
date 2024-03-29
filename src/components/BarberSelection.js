import React, { useState, useEffect } from 'react';

function BarberSelection() {
    const [barbers, setBarbers] = useState([]);
    const [selectedBarber, setSelectedBarber] = useState('');

    useEffect(() => {
        fetch('/api/barbers')
            .then(response => response.json())
            .then(data => setBarbers(data))
            .catch(error => console.error('Error fetching barbers:', error));
    }, []);

    const handleBarberChange = (event) => {
        setSelectedBarber(event.target.value);
    };

    return (
        <div>
            <label htmlFor="barber-select">Choose a barber:</label>
            <select id="barber-select" value={selectedBarber} onChange={handleBarberChange}>
                <option value="">--Please choose a barber--</option>
                {barbers.map(barber => (
                    <option key={barber.id} value={barber.id}>{barber.name}</option>
                ))}
            </select>
        </div>
    );
}

export default BarberSelection;
