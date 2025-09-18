import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import SearchPage from './SearchPage';
import SearchResultPage from './SearchResultPage';
import DetailPage from './DetailPage';


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
