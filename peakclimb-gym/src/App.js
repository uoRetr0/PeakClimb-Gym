import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Explore from './pages/Explore';
import Info from './pages/Info';
import Schedule from './pages/Schedule';
import './App.css';

const App = () => (
  <Routes>
    <Route path="PeakClimb-Gym/" element={<Home />} />
    <Route path="PeakClimb-Gym/booking" element={<Booking />} />
    <Route path="PeakClimb-Gym/explore" element={<Explore />} />
    <Route path="PeakClimb-Gym/info" element={<Info />} />
    <Route path="PeakClimb-Gym/schedule" element={<Schedule />} />
  </Routes>
);

export default App;
