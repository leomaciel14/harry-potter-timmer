import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OpeningScreen from './components/OpeningScreen';
import Phase1 from './components/Phase1';
import Phase2 from './components/Phase2';
import Timer from './components/Timer';
import './App.css';

const App = () => {
  const handleStart = () => {
    console.log('Game started');
    
    // Qualquer outra lógica de inicialização
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<OpeningScreen onStart={handleStart} />} />
        <Route path="/phase1" element={<Phase1 />} />
        <Route path="/phase2" element={<Phase2 />} />
        <Route path="/timer" element={<Timer />} />
      </Routes>
    </Router>
  );
};

export default App;
