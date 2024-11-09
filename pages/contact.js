// pages/index.js
import React, { useState } from 'react';
import Sidebar from '../src/components/Sidebar';
import ProfileBar from '../src/components/ProfileBar';
import Layout from '../src/components/Layout'; // Optional layout component

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Layout isExpanded={isExpanded} toggleSidebar={toggleSidebar}>

      {/* Main content */}
      <div

      >
        <h1>My Bots Performance</h1>
        <h2>Performance Page</h2>
        <p>Content for the Performance page goes here.</p>
      </div>
    </Layout>
  );
}


