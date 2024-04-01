import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Navbar.css";
import HomeIcon from '../../assets/HomeIcon.svg';
import BookingIcon from '../../assets/CalendarIcon.svg';
import ProfileIcon from '../../assets/UserIcon.svg';
import Home from '../Home/Home';
import Booking from '../BookingPage/Booking';
import Profile from '../UserProfilePage/Profile';

const Navbar = () => {
  return (
    <div className="navbar">
      <NavLink to="/" className="nav-button" activeClassName='active'>
        <img src={HomeIcon} alt="Home" className="icon" />
        <span className="icon-name">Home</span>
      </NavLink>
      <NavLink to="/booking" className="nav-button" activeClassName='active'>
        <img src={BookingIcon} alt="Booking" className="icon" />
        <span className="icon-name">Booking</span>
      </NavLink>
      <NavLink to="/profile" className="nav-button" activeClassName='active'>
        <img src={ProfileIcon} alt="Profile" className="icon" />
        <span className="icon-name">Profile</span>
      </NavLink>
    </div>
  );
}


export default Navbar;
