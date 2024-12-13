import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const Install = () => {
  const [email, setEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rows, setRows] = useState([]);
  const [formData, setFormData] = useState({ ea_token: '', port_number: '', symbol: '' });
  const [confirmCode, setConfirmCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [editRow, setEditRow] = useState(null);

  const handleConfirm = async () => {
    try {
      switch (confirmCode) {
        case 'Zho999':
          setEmail('WorldBotRank@gmail.com');
          setIsAuthenticated(true);
          await fetchRows('WorldBotRank@gmail.com');
          break;
        case 'Aon919':
          setEmail('WorldBotRank1@gmail.com');
          setIsAuthenticated(true);
          await fetchRows('WorldBotRank1@gmail.com');
          break;
        case 'Tong547':
          setEmail('WorldBotRank2@gmail.com');
          setIsAuthenticated(true);
          await fetchRows('WorldBotRank2@gmail.com');
          break;
        case 'Chen456':
          setEmail('WorldBotRank3@gmail.com');
          setIsAuthenticated(true);
          await fetchRows('WorldBotRank3@gmail.com');
          break;
        default:
          setErrorMessage('รหัสยืนยันไม่ถูกต้อง');
          console.error('Invalid confirmation code:', confirmCode);
          return;
      }
      console.log('User authenticated with email:', email);
    } catch (error) {
      console.error('Error in handleConfirm:', error);
      setErrorMessage('เกิดข้อผิดพลาดในการยืนยัน');
    }
  };

  const fetchRows = async (userEmail) => {
    try {
      const { data, error } = await supabase
        .from('EA_Lock')
        .select('*')
        .eq('email', userEmail);

      if (error) {
        console.error('Error fetching rows:', error);
        throw error;
      }
      setRows(data);
      console.log('Fetched rows:', data);
    } catch (error) {
      console.error('Error in fetchRows:', error);
      setRows([]);
    }
  };

  const handleAddRow = async () => {
    try {
      const newRow = { ...formData, email, uuid_install: uuidv4(), date_update: new Date().toISOString() };
      console.log('Adding new row:', newRow);

      const { error } = await supabase.from('EA_Lock').insert([newRow]);

      if (error) {
        console.error('Error adding row:', error);
        throw error;
      }
      console.log('Row added successfully:', newRow);
      await fetchRows(email); // Refresh rows
      setFormData({ ea_token: '', port_number: '', symbol: '' }); // Reset form
    } catch (error) {
      console.error('Error in handleAddRow:', error);
      alert('Failed to add row. Please try again.');
    }
  };

  const handleEditRow = async () => {
    try {
      const updatedRow = { ...editRow, date_update: new Date().toISOString() };
      console.log('Updating row with UUID:', updatedRow.uuid_install);

      const { error } = await supabase
        .from('EA_Lock')
        .update({
          ea_token: updatedRow.ea_token,
          port_number: updatedRow.port_number,
          symbol: updatedRow.symbol,
          date_update: updatedRow.date_update,
        })
        .eq('uuid_install', updatedRow.uuid_install);

      if (error) {
        console.error('Error updating row:', error);
        throw error;
      }
      console.log('Row updated successfully:', updatedRow);
      await fetchRows(email); // Refresh rows
      setEditRow(null); // Exit edit mode
    } catch (error) {
      console.error('Error in handleEditRow:', error);
      alert('Failed to update row. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1>กรอกรหัสยืนยันเพื่อเข้าถึงหน้านี้</h1>
        <input
          type="text"
          placeholder="รหัสยืนยัน"
          value={confirmCode}
          onChange={(e) => setConfirmCode(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', margin: '10px 0' }}
        />
        <button onClick={handleConfirm} style={{ padding: '10px 20px', fontSize: '16px' }}>ยืนยัน</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Install Page</h1>
      <p>Email: {email}</p>
      <table border="1" style={{ margin: '0 auto', width: '80%' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>EA Token</th>
            <th>Port Number</th>
            <th>Symbol</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.uuid_install}>
              <td>{index + 1}</td>
              <td>{row.ea_token}</td>
              <td>{row.port_number}</td>
              <td>{row.symbol}</td>
              <td>{row.date_update ? new Date(row.date_update).toLocaleString() : 'N/A'}</td>
              <td>
                <button
                  onClick={() => setEditRow(row)}
                  style={{ marginRight: '10px' }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editRow && (
        <div style={{ marginTop: '20px', padding: '20px', border: '1px solid black', display: 'inline-block' }}>
          <h2>Edit Row</h2>
          <input
            type="text"
            value={editRow.ea_token}
            onChange={(e) => setEditRow({ ...editRow, ea_token: e.target.value })}
            placeholder="EA Token"
            style={{ padding: '10px', margin: '10px', width: '200px' }}
          />
          <input
            type="number"
            value={editRow.port_number}
            onChange={(e) => setEditRow({ ...editRow, port_number: e.target.value })}
            placeholder="Port Number"
            style={{ padding: '10px', margin: '10px', width: '200px' }}
          />
          <input
            type="text"
            value={editRow.symbol}
            onChange={(e) => setEditRow({ ...editRow, symbol: e.target.value })}
            placeholder="Symbol"
            style={{ padding: '10px', margin: '10px', width: '200px' }}
          />
          <div>
            <button
              onClick={handleEditRow}
              style={{ padding: '10px 20px', margin: '10px' }}
            >
              Save
            </button>
            <button
              onClick={() => setEditRow(null)}
              style={{ padding: '10px 20px', margin: '10px' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <h2>Add New Row</h2>
      <input
        type="text"
        placeholder="EA Token"
        value={formData.ea_token}
        onChange={(e) => setFormData({ ...formData, ea_token: e.target.value })}
        style={{ padding: '10px', margin: '10px', width: '200px' }}
      />
      <input
        type="number"
        placeholder="Port Number"
        value={formData.port_number}
        onChange={(e) => setFormData({ ...formData, port_number: e.target.value })}
        style={{ padding: '10px', margin: '10px', width: '200px' }}
      />
      <input
        type="text"
        placeholder="Symbol"
        value={formData.symbol}
        onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
        style={{ padding: '10px', margin: '10px', width: '200px' }}
      />
      <button onClick={handleAddRow} style={{ padding: '10px 20px', fontSize: '16px' }}>Add Row</button>
    </div>
  );
};

export default Install;
