// pages/index.js
import React, { useState, useEffect } from 'react';
import Sidebar from '../src/components/Sidebar';
import ProfileBar from '../src/components/ProfileBar'; // Import the ProfileBar component
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router'; // Import useRouter for navigation

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your_supabase_url';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your_supabase_anon_key';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter(); // Create a router instance

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // Function to fetch data based on UUID and email from Pin_UUID
  const fetchData = async () => {
    const uuid = localStorage.getItem('uuid'); // Get UUID from local storage
    if (!uuid) return; // Exit if no UUID

    try {
      // Fetch email from Pin_UUID
      const { data: emailData, error: emailError } = await supabase
        .from('Pin_UUID')
        .select('email')
        .eq('uuid', uuid)
        .single(); // Ensure to return a single entry

      if (emailError) throw emailError;

      // Fetch all EA_Lock entries for the given UUID
      const { data: eaLocks, error } = await supabase
        .from('EA_Lock')
        .select('countport, ea_token') // Select countport and ea_token
        .eq('save_uuid', uuid); // Filter by the user UUID

      if (error) throw error;

      // Fetch corresponding bot names from Expert_advisor based on ea_token
      const enrichedData = await Promise.all(
        eaLocks.map(async (lock) => {
          const { data: advisor, error: advisorError } = await supabase
            .from('Expert_Advisor')
            .select('name')
            .eq('ea_token', lock.ea_token)
            .single(); // Fetch single bot name

          if (advisorError) throw advisorError;

          return {
            ...lock,
            email: emailData.email,
            botName: advisor?.name || 'Unknown Bot',
          };
        })
      );

      // Sort data by countport
      enrichedData.sort((a, b) => a.countport - b.countport);

      setData(enrichedData);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const uuid = localStorage.getItem('uuid');
    const expirationTime = localStorage.getItem('expirationTime');

    // Check for UUID and expiration
    if (!uuid || !expirationTime || Date.now() > expirationTime) {
      router.push(`/login`); // Redirect to login if not authenticated
    } else {
      fetchData(); // Fetch data if authenticated
    }
  }, [router]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ display: 'flex', height: '100vh', position: 'relative' }}>
      <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      <ProfileBar /> {/* Add the ProfileBar component here */}
      <div
        style={{
          flex: 1,
          marginLeft: isExpanded ? '250px' : '80px',
          transition: 'margin-left 0.3s',
          padding: '20px',
        }}
      >
        <h1>Bot Buffet API</h1>
        <h2>Email: {data.length > 0 ? data[0].email : 'N/A'}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {data.map((item) => (
            <div key={item.save_uuid} style={{ borderRadius: '8px', border: '1px solid #ccc', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Count Port: {item.countport}</span>
              <span>Bot Name: {item.botName}</span>
              {/* Additional input and button logic here */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
