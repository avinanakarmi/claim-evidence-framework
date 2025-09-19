import '../App.css';

import TopBar from '../components/TopBar';
import LeftPane from '../components/LeftPane';
import RightPane from '../components/RightPane';
import React, { useRef, useState } from 'react';


const ViewClaimsPage = () => {
  const [leftWidth, setLeftWidth] = useState(340); // px, initial width
  const dragging = useRef(false);

  const handleMouseDown = (e) => {
    dragging.current = true;
    document.body.style.cursor = 'col-resize';
  };

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging.current) return;
      setLeftWidth(Math.max(220, Math.min(e.clientX, 600)));
    };
    const handleMouseUp = () => {
      dragging.current = false;
      document.body.style.cursor = '';
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="h-screen bg-gray-50">
      <TopBar />
      {/* Main content area */}
      <main className="flex flex-row w-full h-full flex-1">
        {/* Resizable LeftPane */}
        <div
          className="overflow-auto flex-shrink-0 bg-white border-r border-gray-200"
          style={{ width: leftWidth, minWidth: 220, maxWidth: 600 }}
        >
          <LeftPane />
        </div>
        {/* Drag handle */}
        <div
          onMouseDown={handleMouseDown}
          className="w-2 cursor-col-resize bg-gray-200 hover:bg-indigo-300 transition"
          style={{ zIndex: 10, userSelect: 'none' }}
        />
        {/* RightPane */}
        <div className="flex-1 min-w-0 overflow-auto">
          <RightPane />
        </div>
      </main>
    </div>
  );
};

export default ViewClaimsPage;
