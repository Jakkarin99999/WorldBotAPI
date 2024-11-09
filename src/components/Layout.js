// src/components/Layout.js
import React from 'react';
import Sidebar from './Sidebar';
import ProfileBar from './ProfileBar';
import Navbar from './Navbar'; // Import the Navbar component

const Layout = ({ children, isExpanded, toggleSidebar }) => {
  return (
    <div style={{ display: 'flex', height: '100vh', position: 'relative' }}>
      {/* Profile bar on the right */}
      <ProfileBar style={{ position: 'absolute', zIndex: 10 }} /> {/* Move ProfileBar above the Navbar */}

      {/* Sidebar on the left */}
      <div style={{ position: 'absolute', top: '10px', left: 0 }}> {/* Adjust position of Sidebar */}
        <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      </div>

      {/* Main content area */}
      <div
        style={{
          flex: 1,
          marginLeft: isExpanded ? '230px' : '80px',
          transition: 'margin-left 0.3s',
          padding: '20px',
          marginTop: '50px', // Leave space for the Navbar
        }}
      >
        <Navbar /> {/* Add the Navbar component here */}
        {children}
      </div>
    </div>
  );
};

export default Layout;
