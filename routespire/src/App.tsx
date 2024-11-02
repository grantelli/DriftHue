import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import RouteQuestions from './components/Questions/RouteQuestions';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/questionnaire" element={<RouteQuestions />} />
    </Routes>
  );
}

export default App;