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

// Cancel (delete) an appointment
app.delete('/api/appointments/:appointmentId', async (req, res) => {
    const appointmentId = req.params.appointmentId;

    try {
        const result = await pool.query('DELETE FROM appointments WHERE id = $1 RETURNING *', [appointmentId]);
        if (result.rowCount === 0) {
            res.status(404).send('Appointment not found or already deleted.');
        } else {
            res.status(200).send('Appointment deleted successfully.');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// Update an appointment
app.put('/api/appointments/:appointmentId', async (req, res) => {
    const appointmentId = req.params.appointmentId;
    const { barberId, serviceId, startTime, endTime } = req.body;

    // Check if the requested time is within working hours
    const workingHours = { start: '09:00', end: '17:00' };
    if (startTime.substring(11, 16) < workingHours.start || endTime.substring(11, 16) >= workingHours.end) {
        return res.status(400).send('Appointment time is outside of working hours.');
    }

    // Check for overlapping appointments
    const { rows: existingAppointments } = await pool.query(
        'SELECT * FROM appointments WHERE barber_id = $1 AND id != $2 AND (start_time, end_time) OVERLAPS ($3, $4)',
        [barberId, appointmentId, startTime, endTime]
    );
    if (existingAppointments.length > 0) {
        return res.status(400).send('Requested time slot is not available.');
    }

    // Update the appointment
    try {
        const { rows } = await pool.query(
            'UPDATE appointments SET barber_id = $1, service_id = $2, start_time = $3, end_time = $4 WHERE id = $5 RETURNING *',
            [barberId, serviceId, startTime, endTime, appointmentId]
        );
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get details of a specific appointment
app.get('/api/appointments/:appointmentId', async (req, res) => {
    const appointmentId = req.params.appointmentId;

    try {
        const { rows } = await pool.query('SELECT * FROM appointments WHERE id = $1', [appointmentId]);
        if (rows.length === 0) {
            return res.status(404).send('Appointment not found.');
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Add a new barber
app.post('/api/barbers', async (req, res) => {
    const { userId } = req.body; // Assuming you're passing the user's ID in the request body

    // Check if the user is an admin
    const userResult = await pool.query('SELECT role FROM users WHERE id = $1', [userId]);
    if (userResult.rows.length === 0 || userResult.rows[0].role !== 'admin') {
        return res.status(403).send('Unauthorized: This action is restricted to admin users.');
    }

    const { name } = req.body;

    try {
        const { rows } = await pool.query('INSERT INTO barbers (name) VALUES ($1) RETURNING *', [name]);
        res.status(201).json(rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update a barber's details
app.put('/api/barbers/:barberId', async (req, res) => {
    const barberId = req.params.barberId;
    const { name } = req.body;

    try {
        const { rows } = await pool.query('UPDATE barbers SET name = $1 WHERE id = $2 RETURNING *', [name, barberId]);
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Delete a barber
// Delete a barber
app.delete('/api/barbers/:barberId', async (req, res) => {
    const barberId = req.params.barberId;

    try {
        const result = await pool.query('DELETE FROM barbers WHERE id = $1 RETURNING *', [barberId]);
        if (result.rowCount === 0) {
            res.status(404).send('Barber not found.');
        } else {
            res.status(200).send('Barber deleted successfully.');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
