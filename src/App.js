import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import SearchResultPage from './pages/SearchResultPage';
import DetailPage from './pages/DetailPage';


import { useState } from 'react';

function App() {
  const [query, setQuery] = useState("");
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage query={query} setQuery={setQuery} />} />
        <Route path="/results" element={<SearchResultPage query={query} setQuery={setQuery} />} />
        <Route path="/detail/:claimId" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
