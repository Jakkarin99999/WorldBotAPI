// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import styles from './UUIDLogin.module.css'; // Import the CSS module for styling

// export default function LoginPage() {
//   const router = useRouter();
//   const { uuid } = router.query; // Retrieve UUID from the URL
//   const [inputUuid, setInputUuid] = useState('');
//   const [pincode, setPincode] = useState('');
//   const [error, setError] = useState('');
//   const [attempts, setAttempts] = useState(0);

//   useEffect(() => {
//     if (uuid) {
//       setInputUuid(uuid); // Set UUID from URL as the default value
//     }
//   }, [uuid]);

//   const handleLogin = async () => {
//     if (attempts >= 5) {
//       setError('คุณกรอกรหัสผิดเกิน 5 ครั้ง โปรดลองใหม่อีกครั้งใน 5 ชั่วโมง');
//       return;
//     }

//     try {
//       const response = await fetch(`/api/login/${inputUuid}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ pincode: pincode.trim() }),
//       });

//       const result = await response.json();

//       if (result.success) {
//         setError('');
//         router.push('/dashboard'); // Redirect to /dashboard page after successful login
//       } else {
//         setError(result.message || 'รหัสผิด กรุณาลองอีกครั้ง');
//         setAttempts(attempts + 1);
//       }
//     } catch (e) {
//       console.error('Unexpected error:', e);
//       setError('เกิดข้อผิดพลาด กรุณาลองอีกครั้ง');
//     }
//   };

//   return (
//     <div className={styles.centerContainer}>
//       <h1 className={styles.title}>เข้าสู่ระบบ</h1>
//       <div className={styles.formContainer}>
//         <label className={styles.label}>UUID:</label>
//         <input
//           type="text"
//           value={inputUuid}
//           onChange={(e) => setInputUuid(e.target.value)}
//           className={styles.inputField}
//           placeholder="UUID"
//         />
//         <input
//           type="password"
//           value={pincode}
//           onChange={(e) => setPincode(e.target.value)}
//           placeholder="กรอกรหัส 6 หลัก"
//           className={styles.inputField}
//         />
//         <button onClick={handleLogin} className={styles.loginButton}>
//           เข้าสู่ระบบ
//         </button>
//         {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
//       </div>
//     </div>
//   );
// }
