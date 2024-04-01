import React, { useState } from 'react';

const Booking = () => {
    // State to manage booking form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        // Add more fields as needed
    });

    // Handle form field changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to submit form data (e.g., send to backend)
        console.log('Form submitted:', formData);
        // Reset form fields after submission
        setFormData({
            name: '',
            email: '',
            // Reset other fields as needed
        });
    };

    return (
        <div className="booking">
            <h2>Book an Appointment</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                {/* Add more form fields for booking details */}
                <button type="submit">Book Appointment</button>
            </form>
        </div>
    );
};

export default Booking;
