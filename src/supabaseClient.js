// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zdxrypcglsoaizoqinoz.supabase.co'; // ใส่ URL ของ Supabase ของคุณ
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkeHJ5cGNnbHNvYWl6b3Fpbm96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNTQxMTIsImV4cCI6MjAyNDYzMDExMn0._-31vXsYDI_H6cpxh4PzVKSz3-YaUNpP0-kHSTa16wk'; // ใส่ Anon Key ของคุณ
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
