import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import styles from './ExpertAdvisorPage.module.css';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const truncateText = (text, maxLength = 100) => {
  if (!text) return ''; // Handle cases where text might be undefined or null
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};


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
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [devName, setDevName] = useState(''); // Track the developer name after confirmation
  const [isCodeValid, setIsCodeValid] = useState(false); // Track whether the code is validated

  useEffect(() => {
    fetchData();
  }, [searchQueries]);

  const fetchData = async () => {
    setLoading(true);

    const queryParams = new URLSearchParams();
    Object.entries(searchQueries).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });

    try {
      const response = await fetch(`/api/expert_advisors?${queryParams.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const allData = await response.json();
      setData(allData);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(`Error fetching data: ${error.message}`);
    }

    setLoading(false);
  };
  
  const handleConfirmCodeSubmit = () => {
    switch (confirmCode) {
      case 'Zho999':
        setDevName('Zho');
        setIsCodeValid(true);
        break;
      case 'Aon919':
        setDevName('Aon');
        setIsCodeValid(true);
        break;
      case 'Tong547':
        setDevName('Tong');
        setIsCodeValid(true);
        break;
      case 'Chen456':
        setDevName('Chen');
        setIsCodeValid(true);
        break;
      default:
        setErrorMessage('รหัสยืนยันไม่ถูกต้อง');
        return;
    }
    setErrorMessage('');
  };

  if (!isCodeValid) {
    return (
      <div className={styles.centerContainer}>
        <h3>กรอกรหัสยืนยันเพื่อเข้าถึงหน้านี้</h3>
        <input
          type="password"
          value={confirmCode}
          onChange={(e) => setConfirmCode(e.target.value)}
          placeholder="รหัสยืนยัน"
          className={styles.inputField}
        />
        <button onClick={handleConfirmCodeSubmit} className={styles.confirmButton}>ยืนยัน</button>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </div>
    );
  }

  const handleSort = (column, direction) => {
    const sortedData = [...data].sort((a, b) => {
      if (a[column] < b[column]) return direction === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    setData(sortedData);
  };

  const handleInputChange = (e, column) => {
    setNewRow({ ...newRow, [column]: e.target.value });
  };

  const handleSearchChange = (e, column) => {
    setSearchQueries({ ...searchQueries, [column]: e.target.value });
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

    const { error } = await supabase.from('Expert_Advisor').insert([{ ...newRow, dev_name, modified_date: new Date().toISOString() }]);
    if (error) {
      setErrorMessage(`Error saving data: ${error.message}`);
    } else {
      setSuccessMessage('บันทึกสำเร็จ!');
      setErrorMessage('');
      fetchData();
      setNewRow({ ea_token: '', name: '', description: '', realm: '', dev_name: '', modified_date: '' });
      setConfirmCode('');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleCellEdit = (row, column) => {
    if (column === 'dev_name' || column === 'modified_date') return;
    setEditedCell({ row, column });
    setEditValue(row[column]);
    setShowPasswordModal(true);
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
    const { error } = await supabase
      .from('Expert_Advisor')
      .update({ [column]: editValue, modified_date: new Date().toISOString() })
      .eq('ea_token', row.ea_token);

    if (error) {
      alert(`ไม่สำเร็จ: ${error.message}`);
    } else {
      alert('บันทึกสำเร็จ!');
      fetchData();
    }
    setEditedCell(null);
    setShowPasswordModal(false);
  };

  // Counting occurrences for each dev_name and realm
  const countByDevName = (name) => data.filter(row => row.dev_name === name).length;
  const countByRealm = (realm) => data.filter(row => row.realm === realm).length;

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

      {/* Sticky Header Section */}
      <div className={styles.stickyHeader}>
        <div className={styles.newRow}>
          <input
            type="text"
            placeholder="ea_token"
            value={newRow.ea_token}
            onChange={(e) => handleInputChange(e, 'ea_token')}
            style={{ width: '15%' }} // 15% width
          />
          <input
            type="text"
            placeholder="name"
            value={newRow.name}
            onChange={(e) => handleInputChange(e, 'name')}
            style={{ width: '20%' }} // 20% width
          />
          <input
            type="text"
            placeholder="description"
            value={newRow.description}
            onChange={(e) => handleInputChange(e, 'description')}
            style={{ width: '25%' }} // 25% width
          />
          <select
            value={newRow.realm}
            onChange={(e) => handleInputChange(e, 'realm')}
            style={{ width: '10%' }} // 10% width
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
            style={{ width: '10%' }} // 10% width
          />
          <button
            className={styles.customButton}
            onClick={handleSave}
            style={{ width: '20%' }} // 20% width
          >
            บันทึก
          </button>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={`${styles.table} ${styles.freezeHeader}`}>

<thead>
  <tr>
    <th>
      <span className={styles.columnHeader}>
        ea_token
        <span className={styles.sortButtons}>
          <button onClick={() => handleSort('ea_token', 'asc')}>▲</button>
          <button onClick={() => handleSort('ea_token', 'desc')}>▼</button>
        </span>
      </span>
      <input type="text" placeholder="ค้นหา ea_token" onChange={(e) => handleSearchChange(e, 'ea_token')} />
    </th>
    <th>
      <span className={styles.columnHeader}>
        name
        <span className={styles.sortButtons}>
          <button onClick={() => handleSort('name', 'asc')}>▲</button>
          <button onClick={() => handleSort('name', 'desc')}>▼</button>
        </span>
      </span>
      <input type="text" placeholder="ค้นหา name" onChange={(e) => handleSearchChange(e, 'name')} />
    </th>
    <th>
      <span className={styles.columnHeader}>
        description by AI
        <span className={styles.sortButtons}>
          <button onClick={() => handleSort('description', 'asc')}>▲</button>
          <button onClick={() => handleSort('description', 'desc')}>▼</button>
        </span>
      </span>
      <input type="text" placeholder="ค้นหา description" onChange={(e) => handleSearchChange(e, 'description')} />
    </th>
    <th>
      <span className={styles.columnHeader}>
        realm
        <span className={styles.sortButtons}>
          <button onClick={() => handleSort('realm', 'asc')}>▲</button>
          <button onClick={() => handleSort('realm', 'desc')}>▼</button>
        </span>
      </span>
      <input type="text" placeholder="ค้นหา realm" onChange={(e) => handleSearchChange(e, 'realm')} />
    </th>
    <th>
      <span className={styles.columnHeader}>
        dev_name
        <span className={styles.sortButtons}>
          <button onClick={() => handleSort('dev_name', 'asc')}>▲</button>
          <button onClick={() => handleSort('dev_name', 'desc')}>▼</button>
        </span>
      </span>
      <input type="text" placeholder="ค้นหา dev_name" onChange={(e) => handleSearchChange(e, 'dev_name')} />
    </th>
    <th>
      <span className={styles.columnHeader}>
        modified_date
        <span className={styles.sortButtons}>
          <button onClick={() => handleSort('modified_date', 'asc')}>▲</button>
          <button onClick={() => handleSort('modified_date', 'desc')}>▼</button>
        </span>
      </span>
      <input type="text" placeholder="ค้นหา modified_date" onChange={(e) => handleSearchChange(e, 'modified_date')} />
    </th>
    <th>
      <span className={styles.columnHeader}>
        created_at
        <span className={styles.sortButtons}>
          <button onClick={() => handleSort('created_at', 'asc')}>▲</button>
          <button onClick={() => handleSort('created_at', 'desc')}>▼</button>
        </span>
      </span>
      <input type="text" placeholder="ค้นหา created_at" onChange={(e) => handleSearchChange(e, 'created_at')} />
    </th>
  </tr>
</thead>

<tbody>
  {data.map((row) => (
    <tr key={row.ea_token} className={styles.tableRow}>
      {['ea_token', 'name', 'description', 'realm', 'dev_name', 'modified_date', 'created_at'].map((column) => (
        <td
          key={column}
          onClick={() => column !== 'dev_name' && column !== 'modified_date' && handleCellEdit(row, column)}
          contentEditable={editedCell?.row?.ea_token === row.ea_token && editedCell.column === column && column !== 'dev_name' && column !== 'modified_date'}
          suppressContentEditableWarning
          className={`${(column === 'modified_date' || column === 'created_at'|| column === 'description') ? styles.smallText : ''} ${(column === 'description') ? styles.scrollableCell : ''}`}
        >
          {editedCell?.row?.ea_token === row.ea_token && editedCell.column === column && column !== 'dev_name' && column !== 'modified_date' ? (
            <input
              type="text"
              value={editValue}
              onChange={handleEditChange}
              onBlur={handleEditSubmit}
            />
          ) : (
            column === 'description' ? truncateText(row[column]) : row[column]
          )}
        </td>
      ))}
    </tr>
  ))}
</tbody>


        </table>
      </div>

      <div className={styles.rowCount}>
        <p>Dev_name: Zho = {countByDevName('Zho')} | Aon = {countByDevName('Aon')} | Tong = {countByDevName('Tong')} | Chen = {countByDevName('Chen')} | total = {countByDevName('Zho') + countByDevName('Aon') + countByDevName('Tong') + countByDevName('Chen')}</p>
        <p>Realm: Martingate = {countByRealm('MARTINGATE')} | Swingala = {countByRealm('SWINGALA')} | Trendra = {countByRealm('TRENDRA')} | Scalpion = {countByRealm('SCALPION')} | Hedgatron = {countByRealm('HEDGATRON')} | Others = {countByRealm('Others')} | total = {countByRealm('MARTINGATE') + countByRealm('SWINGALA') + countByRealm('TRENDRA') + countByRealm('SCALPION') + countByRealm('HEDGATRON') + countByRealm('Others')}</p>
      </div>
    </div>
  );
}
