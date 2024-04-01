import React from 'react';
import "./BarberButtons.css";
import Location from '../../assets/Location.svg';
import Star from '../../assets/Star.svg';

const BarberButtons = () => {
  // Sample data for demonstration
  const barbers = [
    {
      id: 1,
      name: 'John Doe',
      image: 'path/to/image.jpg',
      barbershop: 'DeadEndCutz',
      rating: 4.5,
      nor: 91
    },
    {
      id: 2,
      name: 'Jane Smith',
      image: 'path/to/image.jpg',
      barbershop: 'DeadEndCutz',
      rating: 4.8,
      nor: 25
    },
    {
      id: 3,
      name: 'Joseph Doe',
      image: 'path/to/image.jpg',
      barbershop: 'DeadEndCutz',
      rating: 4.5,
      nor: 91
    },
    {
      id: 4,
      name: 'Amanda Smith',
      image: 'path/to/image.jpg',
      barbershop: 'DeadEndCutz',
      rating: 4.8,
      nor: 25
    },
  ];

  return (
    <div className="barber-buttons-container">
      <div className="top-barber-padding"></div>
      <div className="barber-buttons">
        {barbers.map(barber => (
          <div key={barber.id} className="barber-card">
            <img src={barber.image} alt={barber.name} className="barber-image" />
            <div className="barber-info">
              <h3 className="barber-name">{barber.name}</h3>
              <div className="barber-details">
                <div className="barbershop-location">
                  <img src={Location} alt="Location Pin" className="pin-drop-icon" />
                  <p className="barbershop-name">{barber.barbershop}</p>
                </div>
                <div className="barber-rating">
                  <img src={Star} alt="Rating Star" className="rating-icon" />
                  <p className="rating">{barber.rating} ({barber.nor})</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bottom-padding"></div>
    </div>
  );
}

export default BarberButtons;
