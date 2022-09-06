import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Main } from './Contexts/Main';
import Home from './Home';
import Login from './Login';

function App() {
  return (
    <div className="App">
      <Main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </Main>
    </div>
  );
}

export default App;
