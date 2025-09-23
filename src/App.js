import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchPage from './pages/SearchPage';
import SearchResultPage from './pages/SearchResultPage';
import DetailPage from './pages/DetailPage';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/results" element={<SearchResultPage />} />
          <Route path="/detail/:imageId" element={<DetailPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
