import React, { useState, useEffect } from 'react';

function ServiceSelection() {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState('');

    useEffect(() => {
        fetch('/api/services')
            .then(response => response.json())
            .then(data => setServices(data))
            .catch(error => console.error('Error fetching services:', error));
    }, []);

    const handleServiceChange = (event) => {
        setSelectedService(event.target.value);
    };

    return (
        <div>
            <label htmlFor="service-select">Choose a service:</label>
            <select id="service-select" value={selectedService} onChange={handleServiceChange}>
                <option value="">--Please choose a service--</option>
                {services.map(service => (
                    <option key={service.id} value={service.id}>{service.name}</option>
                ))}
            </select>
        </div>
    );
}

export default ServiceSelection;
