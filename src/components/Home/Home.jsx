import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { Header, BarberButtons, Navbar, Footer } from "../../components"

const HomePage = () => {
    return (
        <div>
            <Header />
            <BarberButtons />
            <Navbar />
        </div>
    );
};

export default HomePage;