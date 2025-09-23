import '../App.css';

import TopBar from '../components/TopBar';
import LeftPane from '../components/LeftPane';
import RightPane from '../components/RightPane';
import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useClaimsByImageId } from '../hooks/useClaims';


const ViewClaimsPage = () => {
  const {imageId } = useParams();
  const navigate = useNavigate();

  // Fetch all claims for this image_id directly from API (no caching)
  const { 
    data: allClaimsForChart = [], 
    isLoading: claimsLoading, 
    error: claimsError 
  } = useClaimsByImageId(imageId);

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

  if (!claimsError && !claimsLoading && allClaimsForChart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopBar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Claim Not Found</h2>
            <p className="text-gray-600 mb-4">
              Claims for the selected chart could not be found. It may have been removed or the link is invalid.
            </p>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state while fetching claims for this chart
  if (claimsLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopBar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Claims...</h2>
            <p className="text-gray-600">Fetching all claims for this chart.</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if there was an error fetching claims
  if (claimsError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopBar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Claims</h2>
            <p className="text-gray-600 mb-4">
              Failed to load claims for this chart: {claimsError.message}
            </p>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }
console.log(allClaimsForChart);

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
          <LeftPane image_id={imageId} caption={allClaimsForChart[0].caption} />
        </div>
        {/* Drag handle */}
        <div
          onMouseDown={handleMouseDown}
          className="w-2 cursor-col-resize bg-gray-200 hover:bg-indigo-300 transition"
          style={{ zIndex: 10, userSelect: 'none' }}
        />
        {/* RightPane */}
        <div className="flex-1 min-w-0 overflow-auto">
          <RightPane allClaimsForChart={allClaimsForChart} />
        </div>
      </main>
    </div>
  );
};

export default ViewClaimsPage;
