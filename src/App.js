import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import BarberList from './components/BarberList';
import ServiceList from './components/ServiceList';
import TimeSlotPicker from './components/TimeSlotPicker';
import AppointmentConfirmation from './components/AppointmentConfirmation';
import Home from './pages/Home';
import SignIn from './pages/SignIn';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/barbers" element={<BarberList />} />
                <Route path="/services" element={<ServiceList />} />
                <Route path="/timeslots" element={<TimeSlotPicker />} />
                <Route path="/confirm" element={<AppointmentConfirmation />} />
            </Routes>
        </Router>
    );
}

export default App;
