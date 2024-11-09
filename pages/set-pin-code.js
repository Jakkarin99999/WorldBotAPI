// pages/index.js
import React, { useState } from 'react';
import Sidebar from '../src/components/Sidebar';

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div
        style={{
          flex: 1,
          marginLeft: isExpanded ? '250px' : '80px', // Adjust the margin based on the sidebar state
          transition: 'margin-left 0.3s', // Smooth transition
        }}
      >
        <h1>Set Pin Code</h1>
        <h2>Performance Page</h2>
        <p>Content for the Performance page goes here.</p>
      </div>
    </div>
  );
}
