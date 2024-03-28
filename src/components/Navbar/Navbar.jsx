import React from 'react';
import "./Navbar.css";
import HomeIcon from '../../assets/HomeIcon.svg';
import BookingIcon from '../../assets/CalendarIcon.svg';
import ProfileIcon from '../../assets/UserIcon.svg';

const Navbar = () => {
  return (
    <div className="navbar">
      <button className="nav-button">
        <img src={HomeIcon} alt="Home" className="icon" />
        <span className="icon-name">Home</span>
      </button>
      <button className="nav-button">
        <img src={BookingIcon} alt="Booking" className="icon" />
        <span className="icon-name">Booking</span>
      </button>
      <button className="nav-button">
        <img src={ProfileIcon} alt="Profile" className="icon" />
        <span className="icon-name">Profile</span>
      </button>
    </div>
  );
}

export default Navbar;
