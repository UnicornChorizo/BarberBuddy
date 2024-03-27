import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BarberList from './components/BarberList';
import ServiceList from './components/ServiceList';
import TimeSlotPicker from './components/TimeSlotPicker';
import AppointmentConfirmation from './components/AppointmentConfirmation';

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/" exact component={BarberList} />
          <Route path="/services" component={ServiceList} />
          <Route path="/timeslots" component={TimeSlotPicker} />
          <Route path="/confirm" component={AppointmentConfirmation} />
        </Switch>
      </Router>
  );
}

export default App;
