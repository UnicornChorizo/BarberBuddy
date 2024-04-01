import React from 'react';
import './App.css';
import { Header, BarberButtons, Navbar} from "../../components"

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