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

    </Layout>
  );
}
