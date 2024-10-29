// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Questionnaire from './components/Questions/Questions';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/questionnaire" element={<Questionnaire />} />
    </Routes>
  );
}

export default App;
