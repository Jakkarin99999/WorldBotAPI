// src/components/Sidebar.js
import React from 'react';
import Link from 'next/link';
import styles from './Sidebar.module.css'; // Ensure this uses CSS modules

function Sidebar({ isExpanded, toggleSidebar }) {
  return (
    <div
      style={{
        width: isExpanded ? '200px' : '50px', // Adjust the width for expanded and collapsed states
        transition: 'width 0.3s', // Smooth transition for width
        background: 'linear-gradient(to right, #4a90e2, #55a4e0)', // Gradient background for shading
        color: '#333',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between', // Space out top and bottom sections
        padding: '10px',
      }}
    >
      {/* Toggle Button */}
      <button onClick={toggleSidebar} style={{ marginTop: '50px' }}>
        {isExpanded ? '<<' : '>>'}
      </button>

      {/* Top Section */}
      {isExpanded && (
        <div className={styles.sidebarTop}>
          <Link href="/performance">
            <button className={styles.sidebarButton}>Performance</button>
          </Link>
          <Link href="/bot-buffet-api">
            <button className={styles.sidebarButton}>Bot Buffet API</button>
          </Link>
          <Link href="/tutorial">
            <button className={styles.sidebarButton}>Tutorial</button>
          </Link>
          <Link href="/download">
            <button className={styles.sidebarButton}>Download</button>
          </Link>
          <Link href="/bt-ranking">
            <button className={styles.sidebarButton}>World Bot Rank</button>
          </Link>
        </div>
      )}

      {/* Bottom Section */}
      {isExpanded && (
        <div className={styles.sidebarBottom}>
          <Link href="/ask-ai">
            <button className={styles.sidebarButton}>Ask AI</button>
          </Link>
          <Link href="/upgrade">
            <button className={styles.sidebarButton}>Upgrade</button>
          </Link>
          <Link href="/settings">
            <button className={styles.sidebarButton}>Settings</button>
          </Link>
          <Link href="/contact">
            <button className={styles.sidebarButton}>Contact</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
