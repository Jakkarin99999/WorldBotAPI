import React, { useState } from 'react';

const ProfileBar = () => {
  const [isVisible, setIsVisible] = useState(true); // State to manage visibility

  const toggleProfile = () => {
    setIsVisible(!isVisible); // Toggle the visibility state
  };

  return (
    <div style={{
      position: 'absolute',
      top: '7px',
      right: '10px',
      zIndex: 10000 // Ensure it appears above other elements
    }}>
      {isVisible && ( // Conditional rendering of profile details
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          transition: 'opacity 0.3s', // Smooth transition for visibility change
          opacity: 1 // Always visible when details are shown
        }}>
          <button onClick={toggleProfile} style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            color: '#007bff'
          }}>
            Hide Profile
          </button>
          <h4>Profile</h4>
          <p>Email: user@example.com</p>
          <p>UUID: 12345-abcde-67890</p>
        </div>
      )}
      {!isVisible && ( // Show profile icon when details are hidden
        <button onClick={toggleProfile} style={{
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '50%', // Make the button circular
          width: '40px', // Set width and height for the circular button
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 10px rgba(0,0,0,0.2)', // Optional shadow for the icon
        }}>
          <img
            src="/path/to/default-profile-icon.png" // Replace with your default icon path
            alt="Profile Icon"
            style={{
              width: '100%', // Fit the icon to the button
              height: '100%',
              borderRadius: '50%' // Ensure the icon is circular
            }}
          />
        </button>
      )}
    </div>
  );
};

export default ProfileBar;
