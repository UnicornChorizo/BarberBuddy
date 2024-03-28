import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="text-center p-10">
            <h1 className="text-4xl font-bold mb-4">Welcome to BarberBuddy</h1>
            <p className="mb-6">Find the perfect barber and book your appointment with ease.</p>
            <Link to="/signin" className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600">
                Sign In / Register
            </Link>
        </div>
    );
}

export default Home;
