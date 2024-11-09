// pages/bt-ranking.js
import React, { useState, useEffect } from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import Sidebar from '../src/components/Sidebar';

export default function BTRanking() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterConditions, setFilterConditions] = useState({});
  const [isExpanded, setIsExpanded] = useState(true);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // Fetch data from the server-side API route
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

    const otherColumns = Object.keys(data[0])
      .filter((key) => key !== 'total_ai' && !['port_number', 'bt_time', 'setting_value', 'wallet_address'].includes(key))
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

    return [botRankingColumn, aiScoreColumn, ...otherColumns];
  }, [data, filterConditions]);

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
      <div
        style={{
          flex: 1,
          marginLeft: isExpanded ? '20px' : '20px',
          transition: 'margin-left 0.3s',
          overflow: 'hidden',
        }}
      >
        <h1 style={{ textAlign: 'center', margin: '15px 0' }}>BT Ranking</h1>
        <div style={{ height: 'calc(107vh - 160px)', overflow: 'auto' }}>
        <div style={{ textAlign: 'center', padding: '20px' }}>Decentralized Bot Optimization Market: A cutting-edge marketplace where bots compete and evolve, optimized for maximum efficiency and performance in decentralized settings.</div>

            <table {...getTableProps()} style={{ width: '100%', textAlign: 'center' }}>
              <thead
                style={{
                  position: 'sticky',
                  top: '0',
                  background: 'Navy',
                  color: 'White',
                  zIndex: '1',
                }}
              >
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        style={{
                          border: '2px solid Gold',
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
  {/* Pagination Container */}
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      width: '25%', // Make the width 1/4 of the page
      minWidth: '200px', // Add a minimum width for smaller screens
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
      width: '120px', // Keep the width increased for better visibility
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
