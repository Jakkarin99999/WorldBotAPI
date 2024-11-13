// // pages/index.js
// import React, { useState, useEffect } from 'react';
// import { createClient } from '@supabase/supabase-js';
// import Layout from '../src/components/Layout'; // Import the Layout component
// import Sidebar from '../src/components/Sidebar';
// import ProfileBar from '../src/components/ProfileBar';

// // Initialize Supabase client
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your_supabase_url'; // Replace with your actual URL
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your_supabase_anon_key'; // Replace with your actual anon key
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

// export default function Home() {
//   const [isExpanded, setIsExpanded] = useState(true);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const toggleSidebar = () => {
//     setIsExpanded(!isExpanded);
//   };

//   // Function to fetch data from Supabase
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('/api/fetchData?token=yourSecretToken');
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const allData = await response.json();
//         allData.sort((a, b) => b.total_ai - a.total_ai); // Sort if needed
//         setData(allData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <Layout isExpanded={isExpanded} toggleSidebar={toggleSidebar}>
//       {/* Main content */}
//       <div>
//         <h1>Bot Buffet API</h1>
//         <h2>Email: {data.length > 0 ? data[0].email : 'N/A'}</h2>
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//           {data.map((item) => (
//             <div key={item.save_uuid} style={{ borderRadius: '8px', border: '1px solid #ccc', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//               <span>Save UUID: {item.save_uuid}</span>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                 <input type="text" placeholder="EA Token" style={{ borderRadius: '5px', padding: '5px' }} />
//                 <input type="text" placeholder="Port Number" style={{ borderRadius: '5px', padding: '5px' }} />
//                 <button
//                   style={{
//                     backgroundColor: 'lightgray',
//                     borderRadius: '5px',
//                     padding: '5px 10px',
//                     cursor: 'pointer',
//                   }}
//                   onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'lightgreen')}
//                   onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'lightgray')}
//                 >
//                   Link
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Button to link all ports */}
//         <button
//           style={{
//             marginTop: '20px',
//             padding: '10px 20px',
//             backgroundColor: 'lightblue',
//             borderRadius: '5px',
//             cursor: 'pointer',
//           }}
//           onClick={() => console.log('Linking all ports')}
//         >
//           Press to Link All Ports
//         </button>
//       </div>
//     </Layout>
//   );
// }
