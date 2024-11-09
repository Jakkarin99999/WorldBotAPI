// src/components/Navbar.js
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between', // Space out items
    alignItems: 'center',
    background: 'linear-gradient(to right, #4a90e2, #50e3c2)', // Gradient background
    padding: '10px 20px',
    position: 'fixed', // Fix to the top
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 1000, // Ensure it appears above other elements
  };

  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '5px',
    transition: 'background 0.3s', // Smooth background transition
  };

  const handleHover = (e) => {
    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
  };

  const handleLeave = (e) => {
    e.target.style.background = 'transparent';
  };

  return (
    <div style={navStyle}>
      <div style={{ marginLeft: '20px' }}> {/* Adjusts the left margin for the first link */}
        <Link href="/" style={linkStyle}>World Bot Rank</Link>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginRight: '100px' }}> {/* Adjusts the right margin for the right links */}
        <Link href="/register" style={linkStyle} onMouseOver={handleHover} onMouseLeave={handleLeave}>Register</Link>
        <Link href="/login" style={linkStyle} onMouseOver={handleHover} onMouseLeave={handleLeave}>Login</Link>
      </div>
    </div>
  );
};

export default Navbar;
