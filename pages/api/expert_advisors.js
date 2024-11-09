// pages/api/expert_advisors.js

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default async function handler(req, res) {
  const { ea_token, name, description, realm, dev_name, modified_date, created_at } = req.query;

  try {
    let query = supabase.from('Expert_Advisor').select('*');

    // Apply search filters based on query parameters
    if (ea_token) query = query.ilike('ea_token', `%${ea_token}%`);
    if (name) query = query.ilike('name', `%${name}%`);
    if (description) query = query.ilike('description', `%${description}%`);
    if (realm) query = query.ilike('realm', `%${realm}%`);
    if (dev_name) query = query.ilike('dev_name', `%${dev_name}%`);
    if (modified_date) query = query.ilike('modified_date', `%${modified_date}%`);
    if (created_at) query = query.ilike('created_at', `%${created_at}%`);

    const { data, error } = await query;

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
