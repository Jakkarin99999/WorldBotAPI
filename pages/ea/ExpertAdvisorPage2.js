import { useState, useEffect } from 'react';
import styles from './ExpertAdvisorPage.module.css';

export default function ExpertAdvisorPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newRow, setNewRow] = useState({ ea_token: '', name: '', description: '', realm: '', dev_name: '', modified_date: '' });
  const [confirmCode, setConfirmCode] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchQueries, setSearchQueries] = useState({ ea_token: '', name: '', description: '', realm: '', dev_name: '', modified_date: '' });
  const [editedCell, setEditedCell] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false); // Define showPasswordModal
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetchData();
  }, [searchQueries]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/expert_advisors');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const allData = await response.json();
      setData(allData);
    } catch (error) {
      setErrorMessage(`Error fetching data: ${error.message}`);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    let dev_name = '';
    switch (confirmCode) {
      case 'Zho999':
        dev_name = 'Zho';
        break;
      case 'Aon919':
        dev_name = 'Aon';
        break;
      case 'Tong547':
        dev_name = 'Tong';
        break;
      case 'Chen456':
        dev_name = 'Chen';
        break;
      default:
        setErrorMessage('รหัสยืนยันไม่ถูกต้อง');
        return;
    }

    const dataToSave = {
      ...newRow,
      dev_name,
      modified_date: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/expert_advisors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave),
      });

      if (!response.ok) {
        throw new Error('Failed to save data');
      }

      setSuccessMessage('บันทึกสำเร็จ!');
      setErrorMessage('');
      setConfirmCode('');
      setNewRow({ ea_token: '', name: '', description: '', realm: '', dev_name: '', modified_date: '' });
      fetchData();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage(`Error saving data: ${error.message}`);
    }
  };

  const handleCellEdit = (row, column) => {
    if (column === 'dev_name' || column === 'modified_date') return;
    setEditedCell({ row, column });
    setEditValue(row[column]);
    setShowPasswordModal(true); // Open modal when editing a cell
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleEditSubmit = async () => {
    if (!editedCell) return;

    let dev_name = '';
    switch (password) {
      case 'Zho999':
        dev_name = 'Zho';
        break;
      case 'Aon919':
        dev_name = 'Aon';
        break;
      case 'Tong547':
        dev_name = 'Tong';
        break;
      case 'Chen456':
        dev_name = 'Chen';
        break;
      default:
        alert('รหัสผ่านไม่ถูกต้อง');
        return;
    }

    if (dev_name !== editedCell.row.dev_name) {
      alert('รหัสผ่านไม่ถูกต้อง');
      return;
    }

    const { row, column } = editedCell;
    const { error } = await fetch('/api/expert_advisors', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [column]: editValue, modified_date: new Date().toISOString() }),
    });

    if (error) {
      alert(`ไม่สำเร็จ: ${error.message}`);
    } else {
      alert('บันทึกสำเร็จ!');
      fetchData();
    }
    setEditedCell(null);
    setShowPasswordModal(false);
  };

  return (
    <div className={styles.container}>
      <h1>Expert Advisor Table</h1>

      {showPasswordModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={() => setShowPasswordModal(false)}>
              &times;
            </span>
            <h3>กรอกรหัสผ่านเพื่อยืนยัน</h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="รหัสผ่าน"
            />
            <button onClick={handleEditSubmit}>ยืนยัน</button>
          </div>
        </div>
      )}

      {/* Render form and table as before */}
      <div className={styles.newRow}>
        <input
          type="text"
          placeholder="ea_token"
          value={newRow.ea_token}
          onChange={(e) => handleInputChange(e, 'ea_token')}
          style={{ width: '15%' }}
        />
        <input
          type="text"
          placeholder="name"
          value={newRow.name}
          onChange={(e) => handleInputChange(e, 'name')}
          style={{ width: '20%' }}
        />
        <input
          type="text"
          placeholder="description"
          value={newRow.description}
          onChange={(e) => handleInputChange(e, 'description')}
          style={{ width: '25%' }}
        />
        <select
          value={newRow.realm}
          onChange={(e) => handleInputChange(e, 'realm')}
          style={{ width: '10%' }}
        >
          <option value="">เลือก Realm</option>
          <option value="MARTINGATE">MARTINGATE</option>
          <option value="SWINGALA">SWINGALA</option>
          <option value="TRENDRA">TRENDRA</option>
          <option value="SCALPION">SCALPION</option>
          <option value="HEDGATRON">HEDGATRON</option>
          <option value="Others">Others</option>
        </select>
        <input
          type="text"
          placeholder="รหัสยืนยัน"
          value={confirmCode}
          onChange={(e) => setConfirmCode(e.target.value)}
          style={{ width: '10%' }}
        />
        <button
          className={styles.customButton}
          onClick={handleSave}
          style={{ width: '20%' }}
        >
          บันทึก
        </button>
      </div>
    </div>
  );
}
