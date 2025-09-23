import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
  const navigate = useNavigate();

  return (
  <header className="w-full flex items-center justify-between bg-gray-900 text-white px-6 py-3 shadow">
    <div className="font-bold text-lg tracking-wide" onClick={() => navigate('/')}>VisClaimer</div>
  </header>
)};

export default TopBar;
