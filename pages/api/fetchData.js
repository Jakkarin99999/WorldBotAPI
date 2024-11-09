// pages/api/fetchData.js
import { createClient } from '@supabase/supabase-js';
import rateLimit from 'express-rate-limit';

// Define Supabase URL and Key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Configure rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

// Define the handler function
export default async function handler(req, res) {
  // Apply rate limiting
  await limiter(req, res, async () => {
    const validToken = 'yourSecretToken'; // Hardcoded token

    const token = req.query.token; // Get token from query parameters
    if (token !== validToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { uuid } = req.query; // Expecting uuid as a query parameter

    if (uuid) {
      // Fetch data from EA_Lock if UUID is provided
      try {
        const { data: eaLocks, error } = await supabase
          .from('EA_Lock')
          .select('save_uuid, email, countport')
          .eq('save_uuid', uuid); // Filter by the user UUID

        if (error) throw error;

        return res.status(200).json(eaLocks); // Send data back to the client
      } catch (error) {
        console.error('Error fetching EA_Lock data:', error);
        return res.status(500).json({ error: error.message });
      }
    }

    // Fallback to other data fetching logic if UUID is not provided
    const { ea_token, name, description, realm, dev_name, modified_date, created_at } = req.query;
    let query = supabase.from('list').select('*').order('id', { ascending: false });

    // Apply search filters based on query parameters
    if (ea_token) query = query.ilike('ea_token', `%${ea_token}%`);
    if (name) query = query.ilike('name', `%${name}%`);
    if (description) query = query.ilike('description', `%${description}%`);
    if (realm) query = query.ilike('realm', `%${realm}%`);
    if (dev_name) query = query.ilike('dev_name', `%${dev_name}%`);
    if (modified_date) query = query.ilike('modified_date', `%${modified_date}%`);
    if (created_at) query = query.ilike('created_at', `%${created_at}%`);

    let allData = [];
    let page = 1;
    const pageSize = 1000;

    while (true) {
      const { data, error } = await query.range((page - 1) * pageSize, page * pageSize - 1);
      if (error) throw error;
      if (!data.length) break;
      allData = [...allData, ...data];
      page++;
    }

    return res.status(200).json(allData);
  });
}
