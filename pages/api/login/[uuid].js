// // pages/api/login/[uuid].js
// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const { uuid } = req.query;
//   const { pincode } = req.body;

//   try {
//     // Fetch data from Supabase on the server side
//     const { data, error } = await supabase
//       .from('Pin_UUID')
//       .select('*')
//       .eq('uuid', uuid.trim())
//       .eq('pincode', pincode.trim())
//       .single();

//     if (error || !data) {
//       return res.status(401).json({ success: false, message: 'Invalid UUID or Pincode' });
//     }

//     // Return success response if the data matches
//     res.status(200).json({ success: true, message: 'Login successful' });
//   } catch (e) {
//     console.error('Server error:', e);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// }

import { useRouter } from 'next/router';

const DynamicPage = () => {
  const router = useRouter();
  const { uuid } = router.query;

  // Redirect or handle specific routes
  if (uuid === 'install') {
    return null; // Prevent rendering for `/install`
  }

  return (
    <div>
      <h1>UUID Page</h1>
      <p>This is a dynamic page for UUID routes.</p>
    </div>
  );
};

export default DynamicPage;
