// pages/bt-ranking.js
import React, { useState, useEffect } from 'react';
import Sidebar from '../src/components/Sidebar';

export default function BTRanking() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // Fetch data function
  async function fetchData() {
    const token = 'yourSecretToken'; // Replace with your actual token

    try {
      const response = await fetch(`http://localhost:3000/api/fetchData?token=${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error fetching data: ' + response.status);
      }

      const result = await response.json();
      setData(result); // Store the fetched data
    } catch (err) {
      setError(err.message); // Capture any errors
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false); // Set loading to false when fetch is complete
    }
  }

  // Use effect to fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>Error: {error}</div>; // Show error message if any

  // Render the component
  return (
    <div>
      <h1>World Bot Rank</h1>
      {/* Render your data here */}
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Example render */}
    </div>
  );
}
