// pages/bt-ranking.js
import React, { useState, useEffect } from 'react';
import supabase from '../src/supabaseClient';
import ProfileBar from '../src/components/ProfileBar';
import { useTable, usePagination, useSortBy } from 'react-table';
import Sidebar from '../src/components/Sidebar';

export default function BTRanking() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterConditions, setFilterConditions] = useState({});
  const [isExpanded, setIsExpanded] = useState(true);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

// Fetch data function
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('/api/fetchData?token=yourSecretToken');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const allData = await response.json();
      allData.sort((a, b) => b.total_ai - a.total_ai); // Sort if needed
      setData(allData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);
// ฟังก์ชันเพื่อกำหนดคะแนนดาวตามค่า AI_Score
const getStarRating = (score) => {
  if (score > 5) return '★★★★★';
  if (score > 3) return '★★★★☆';
  if (score > 2) return '★★★★';
  if (score > 1.5) return '★★★☆';
  if (score >= 1) return '★★★';
  return '★★☆';
};

  

  const flags = [
    { code: 'us', name: 'United States' },
    { code: 'gb', name: 'United Kingdom' },
    { code: 'jp', name: 'Japan' },
    { code: 'de', name: 'Germany' },
    { code: 'fr', name: 'France' },
    { code: 'au', name: 'Australia' },
    { code: 'ca', name: 'Canada' },
    { code: 'sg', name: 'Singapore' },
    { code: 'hk', name: 'Hong Kong' },
    { code: 'my', name: 'Malaysia' },
    { code: 'ch', name: 'China' },
    { code: 'th', name: 'Thailand' },
    { code: 'th', name: 'Thailand' },
    { code: 'th', name: 'Thailand' },
    { code: 'th', name: 'Thailand' },
  ];
  
  // Function to get a random flag
  const getRandomFlag = () => {
    const randomFlag = flags[Math.floor(Math.random() * flags.length)];
    return (
      <img
        src={`https://flagcdn.com/16x12/${randomFlag.code}.png`}
        srcSet={`https://flagcdn.com/32x24/${randomFlag.code}.png 2x,
                 https://flagcdn.com/48x36/${randomFlag.code}.png 3x`}
        width="16"
        height="12"
        alt={randomFlag.name}
      />
    );
  };


    // Fetch data function
    async function fetchData() {
      const username = 'yourUsername'; // Replace with your actual username
      const password = 'yourPassword'; // Replace with your actual password
  
      try {
        const response = await fetch('http://localhost:3000/api/fetchData', {
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + btoa(`${username}:${password}`), // Base64 encode the username and password
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Error fetching data: ' + response.status);
        }
  
        const result = await response.json();
        setData(result); // Store the fetched data
      } catch (err) {
        setError(err.message); // Capture any errors
      }
    }
  
  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/fetchData');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const allData = await response.json();
        allData.sort((a, b) => b.total_ai - a.total_ai); // Sort if needed
        setData(allData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle filter changes
  const handleFilterChange = (column, condition, value) => {
    setFilterConditions((prev) => ({
      ...prev,
      [column]: { condition, value },
    }));
  };

  // Define text and numeric columns
  const textColumns = ['ea_token', 'symbols', 'platform'];
  const numericColumns = [
    'id', 'time_frame', 'bal_start', 'bal_end', 'eq_start', 'eq_end', 'days', 'max_dd',
    'a_val', 'b_val', 'c_val', 'd_val', 'e_val', 'profit', 'gross_profit', 'gross_loss',
    'max_profit_trade', 'max_loss_trade', 'con_profit_max', 'con_profit_max_trades', 'max_con_wins',
    'max_con_profit_trades', 'con_loss_max', 'con_loss_max_trades', 'max_con_losses',
    'max_con_loss_trades', 'balance_min', 'balance_dd', 'balance_dd_percent', 'balance_dd_rel_percent',
    'balance_dd_relative', 'equity_min', 'equity_dd', 'equity_dd_percent', 'equity_dd_rel_percent',
    'equity_dd_relative', 'expected_payoff', 'profit_factor', 'min_margin_level', 'trades',
    'profit_trades', 'loss_trades', 'short_trades', 'long_trades', 'profit_short_trades',
    'profit_long_trades', 'profit_trades_avg_con', 'loss_trades_avg_con'
  ];

  
  const filteredData = React.useMemo(() => {
    return data.filter((row) => {
      for (const [column, { condition, value }] of Object.entries(filterConditions)) {
        if (!value) continue;
        if (textColumns.includes(column)) {
          if (condition === 'exact' && row[column] !== value) return false;
          if (condition === 'contain' && !row[column]?.includes(value)) return false;
        } else if (numericColumns.includes(column)) {
          const numericValue = Number(value);
          if (isNaN(numericValue)) continue;
          if (condition === '=' && row[column] !== numericValue) return false;
          if (condition === '>' && row[column] <= numericValue) return false;
          if (condition === '<' && row[column] >= numericValue) return false;
        }
      }
      return true;
    });
  }, [data, filterConditions]);

  // Define table columns
  const columns = React.useMemo(() => {
    if (data.length === 0) return [];
  
    const botRankingColumn = {
      Header: 'Bot Ranking',
      accessor: 'bot_ranking',
      Cell: ({ row, state: { pageIndex, pageSize } }) => row.index + 1 + pageIndex * pageSize,
    };
  
    const aiScoreColumn = {
      Header: 'AI_Score',
      accessor: 'total_ai',
    };
  
    const serverLocationColumn = {
      Header: 'VPS Approx. Loc.',
      accessor: 'server_location',
      Cell: () => (
        <div style={{ fontSize: '9px' }}>
          {getRandomFlag()}
        </div>
      ),
    };
  
    const eaTokenColumn = {
      Header: (
        <div>
          ea_token
          <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
            <select
              onChange={(e) => handleFilterChange('ea_token', e.target.value, filterConditions['ea_token']?.value || '')}
            >
              <option value="exact">Exact</option>
              <option value="contain">Contain</option>
            </select>
            <input
              type="text"
              onChange={(e) => handleFilterChange('ea_token', filterConditions['ea_token']?.condition || 'exact', e.target.value)}
              value={filterConditions['ea_token']?.value || ''}
              style={{ width: '120px', textAlign: 'center' }}
            />
          </div>
        </div>
      ),
      accessor: 'ea_token',
      Cell: ({ row }) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', width: '100%' }}> {/* Centering content */}
          <span style={{ textAlign: 'center' }}>{row.values.ea_token}</span>
          <span style={{ color: '#FFD700', fontSize: '14px' }}>
            {getStarRating(row.values.total_ai)}
          </span>
        </div>
      ),
    };
    
    
    // คอลัมน์อื่น ๆ ยังคงเหมือนเดิม
    const otherColumns = Object.keys(data[0])
      .filter((key) => key !== 'total_ai' && key !== 'ea_token' && !['port_number', 'bt_time', 'setting_value', 'wallet_address'].includes(key))
      .map((key) => ({
        Header: (
          <div>
            {key}
            {textColumns.includes(key) && (
              <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                <select
                  onChange={(e) => handleFilterChange(key, e.target.value, filterConditions[key]?.value || '')}
                >
                  <option value="exact">Exact</option>
                  <option value="contain">Contain</option>
                </select>
                <input
                  type="text"
                  onChange={(e) => handleFilterChange(key, filterConditions[key]?.condition || 'exact', e.target.value)}
                  value={filterConditions[key]?.value || ''}
                  style={{ width: '120px', textAlign: 'center' }}
                />
              </div>
            )}
            {numericColumns.includes(key) && (
              <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                <select
                  onChange={(e) => handleFilterChange(key, e.target.value, filterConditions[key]?.value || '')}
                >
                  <option value="=">=</option>
                  <option value=">">&gt;</option>
                  <option value="<">&lt;</option>
                </select>
                <input
                  type="number"
                  onChange={(e) => handleFilterChange(key, filterConditions[key]?.condition || '=', e.target.value)}
                  value={filterConditions[key]?.value || ''}
                  style={{ width: '80px', textAlign: 'center' }}
                />
              </div>
            )}
          </div>
        ),
        accessor: key,
      }));
    
    // คืนค่าคอลัมน์รวม
    return [
      botRankingColumn,
      aiScoreColumn,
      serverLocationColumn,
      eaTokenColumn,
      ...otherColumns,
    ];
    
  }, [data, filterConditions]);
  

  // Table setup
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: {
        pageIndex: 0,
        pageSize: 100,
        sortBy: [{ id: 'total_ai', desc: true }],
      },
    },
    useSortBy,
    usePagination
  );

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div style={{ flex: 1, marginLeft: isExpanded ? '20px' : '20px', transition: 'margin-left 0.3s', overflow: 'hidden' }}>
        <h1 style={{ textAlign: 'center', margin: '15px 0' }}>World Bot Rank</h1>
        <div style={{ height: 'calc(107vh - 160px)', overflow: 'auto' }}>
          <div style={{ textAlign: 'center', padding: '20px' }}>Decentralized Bot Optimization Market: A marketplace for bots to compete and evolve, maximizing efficiency and performance in decentralized environments for MT4/MT5 algo trading communities (BUY EA parameter settings).</div>

          <table {...getTableProps()} style={{ width: '100%', textAlign: 'center' }}>
            <thead style={{ position: 'sticky', top: '0', background: 'linear-gradient(to bottom, #1F2A44, #BCC1C7)', color: 'White', zIndex: '1' }}>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      style={{
                        border: '2px solid Black',
                        padding: '5px',
                        cursor: 'pointer',
                        textAlign: 'center',
                      }}
                    >
                      {column.render('Header')}
                      <span>
                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          border: '0.5px solid Grey',
                          padding: '5px',
                          textAlign: 'center',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <div style={{ maxHeight: '100%', overflowY: 'auto', whiteSpace: 'normal' }}>
                          {cell.render('Cell')}
                        </div>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '25%',
              minWidth: '200px',
            }}
          >
            <button
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              style={{ padding: '3px 5px', cursor: 'pointer' }}
            >
              {'<<'}
            </button>
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              style={{ padding: '3px 5px', cursor: 'pointer' }}
            >
              {'<'}
            </button>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              style={{ padding: '3px 5px', cursor: 'pointer' }}
            >
              {'>'}
            </button>
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              style={{ padding: '3px 5px', cursor: 'pointer' }}
            >
              {'>>'}
            </button>
          </div>

          <span style={{ marginLeft: '10px' }}>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            style={{
              marginLeft: '10px',
              padding: '5px',
              cursor: 'pointer',
              width: '120px',
            }}
          >
            {[10, 20, 50, 100, 200, 500, 1000].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

