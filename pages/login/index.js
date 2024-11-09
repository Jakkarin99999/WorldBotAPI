import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const router = useRouter();
  const { uuid } = router.query; // Get UUID from URL query
  const [inputUuid, setInputUuid] = useState('');
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (uuid) {
      setInputUuid(uuid); // Set inputUuid to UUID from URL on load
    }
  }, [uuid]);

  const handleLogin = async () => {
    try {
      // Send a POST request to the API endpoint
      const response = await fetch(`/api/login/${inputUuid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pincode: pincode.trim() }),
      });

      const result = await response.json();

      if (result.success) {
        setError('');
        localStorage.setItem('uuid', inputUuid); // Store UUID in local storage
        localStorage.setItem('loginTime', Date.now()); // Store login time
        localStorage.setItem('email', result.email); // Store email in local storage
        router.push('/'); // Redirect to the main page after login
      } else {
        setError(result.message || 'Invalid credentials, please try again');
      }
    } catch (e) {
      console.error('Unexpected error:', e);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.centerContainer}>
      <h1 className={styles.title}>เข้าสู่ระบบ</h1>
      <div className={styles.formContainer}>
        <label>UUID:</label>
        <input
          type="text"
          value={inputUuid}
          onChange={(e) => setInputUuid(e.target.value)}
          className={styles.inputField}
          placeholder="UUID"
        />
        <input
          type="password"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="กรอกรหัส 6 หลัก"
          className={styles.inputField}
        />
        <button onClick={handleLogin} className={styles.loginButton}>
          เข้าสู่ระบบ
        </button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </div>
    </div>
  );
}
