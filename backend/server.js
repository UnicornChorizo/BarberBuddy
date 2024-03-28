const express = require('express');
const pool = require('./db');
const app = express();
const port = 3001;

app.use(express.json());

function addMinutes(time, minutes) {
    const [hours, mins] = time.split(':').map(Number);
    const newMinutes = mins + minutes;
    const newHours = hours + Math.floor(newMinutes / 60);
    const finalMinutes = newMinutes % 60;
    return `${String(newHours).padStart(2, '0')}:${String(finalMinutes).padStart(2, '0')}`;
}

function timeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}

// Get all barbers
app.get('/api/barbers', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM barbers');
        res.json(rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get all services
app.get('/api/services', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM services');
        res.json(rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get available time slots for a barber
app.get('/api/barbers/:barberId/available-slots', async (req, res) => {
    const barberId = req.params.barberId;
    const date = req.query.date;

    const workingHours = {
        start: '09:00',
        end: '17:00'
    };

    const { rows: existingAppointments } = await pool.query(
        'SELECT start_time, end_time FROM appointments WHERE barber_id = $1 AND DATE(start_time) = $2',
        [barberId, date]
    );

    const availableSlots = [];
    let currentTime = workingHours.start;
    const totalSlots = 16; // 8 hours * 2 slots per hour

    for (let i = 0; i < totalSlots; i++) {
        const endTime = addMinutes(currentTime, 30);

        const isAvailable = !existingAppointments.some(appointment => {
            const appointmentStart = appointment.start_time.toISOString().substring(11, 16);
            const appointmentEnd = appointment.end_time.toISOString().substring(11, 16);
            return (currentTime >= appointmentStart && currentTime < appointmentEnd) ||
                (endTime > appointmentStart && endTime <= appointmentEnd);
        });

        if (isAvailable) {
            availableSlots.push({ startTime: `${date}T${currentTime}`, endTime: `${date}T${endTime}` });
        }

        currentTime = endTime;
    }

    res.json(availableSlots);
});


// Book an appointment
app.post('/api/appointments', async (req, res) => {
    const { barberId, serviceId, startTime, endTime } = req.body;

    // Check if the requested time is within working hours
    const workingHours = { start: '09:00', end: '17:00' };
    if (startTime.substring(11, 16) < workingHours.start || endTime.substring(11, 16) >= workingHours.end) {
        return res.status(400).send('Appointment time is outside of working hours.');
    }

    // Check for overlapping appointments
    const { rows: existingAppointments } = await pool.query(
        'SELECT * FROM appointments WHERE barber_id = $1 AND (start_time, end_time) OVERLAPS ($2, $3)',
        [barberId, startTime, endTime]
    );
    if (existingAppointments.length > 0) {
        return res.status(400).send('Requested time slot is not available.');
    }

    // If the time slot is available, book the appointment
    try {
        const { rows } = await pool.query(
            'INSERT INTO appointments (barber_id, service_id, start_time, end_time) VALUES ($1, $2, $3, $4) RETURNING *',
            [barberId, serviceId, startTime, endTime]
        );
        res.status(201).json(rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
