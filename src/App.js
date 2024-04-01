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



// function App() {
//     return (
//         <Router>
//             <div className="App">
//                 <header>
//                     <h1>Barbershop</h1>
//                 </header>
//                 <nav>
//                     <ul>
//                         <li><Link to="/">Home</Link></li>
//                         <li><Link to="/barbers">Barbers</Link></li>
//                     </ul>
//                 </nav>
//                 <main>
//                     <Routes>
//                         <Route path="/" element={<Home />} />
//                         <Route path="/barbers" element={<BarberListPage />} />
//                         <Route path="/barbers/:id" element={<BarberPage />} />
//                     </Routes>
//                 </main>
//                 <footer>
//                     <p>© 2024 Barbershop</p>
//                 </footer>
//             </div>
//         </Router>
//     );
// }

// function Home() {
//     return (
//         <div>
//             <h2>Welcome to our Barbershop!</h2>
//             <p>We provide the best haircut services in town.</p>
//         </div>
//     );
// }

// function BarberListPage() {
//     // Assume you have a list of barbers with their details
//     const barbers = [
//         { id: 1, name: 'John' },
//         { id: 2, name: 'Michael' },
//         { id: 3, name: 'David' },
//         // Add more barbers as needed
//     ];

//     return (
//         <div>
//             <h2>Our Barbers</h2>
//             <ul className="barber-list">
//                 {barbers.map(barber => (
//                     <li key={barber.id}>
//                         <Link to={`/barbers/${barber.id}`}>{barber.name}</Link>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }