import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// ตั้งค่า Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function TestSupabaseConnection() {
  useEffect(() => {
    // ตรวจสอบว่า Environment Variables ถูกโหลดอย่างถูกต้อง
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('Supabase ANON KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    const testConnection = async () => {
      try {
        // ดึงข้อมูลทั้งหมดจากตาราง Pin_UUID
        const { data, error } = await supabase
          .from('Pin_UUID')
          .select('*');

        if (error) {
          console.error('Supabase connection error:', error);
        } else {
          console.log('Supabase connection successful, data:', data);
        }
      } catch (e) {
        console.error('Unexpected error:', e);
      }
    };

    testConnection();
  }, []);

  return (
    <div>
      <h1>Testing Supabase Connection</h1>
      <p>Check the console for results</p>
    </div>
  );
}
