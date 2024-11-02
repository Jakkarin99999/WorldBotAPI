import React, { useEffect, useState } from 'react';
import supabase from '../src/supabaseClient';
import { useTable, usePagination, useSortBy } from 'react-table';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterConditions, setFilterConditions] = useState({});
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      let page = 1;
      let pageSize = 1000;

      while (true) {
        const { data: userData, error } = await supabase
          .from('list')
          .select('*')
          .order('id', { ascending: false })
          .range((page - 1) * pageSize, page * pageSize - 1);

        if (error) {
          console.error('Error fetching data:', error);
          break;
        }

        if (userData.length === 0) break;
        allData = [...allData, ...userData];
        page++;
      }

      // Sort data by total_ai in descending order
      allData.sort((a, b) => b.total_ai - a.total_ai);
      setData(allData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleFilterChange = (column, condition, value) => {
    setFilterConditions((prev) => ({
      ...prev,
      [column]: { condition, value },
    }));
  };

  const filteredData = React.useMemo(() => {
    return data.filter((row) => {
      // Iterate through all filter conditions and apply them with an "AND" logic
      for (const [column, { condition, value }] of Object.entries(filterConditions)) {
        if (!value) continue; // Skip if there is no value for the filter
  
        // Convert the value to a number for comparison
        const numericValue = Number(value);
        if (isNaN(numericValue)) continue; // Skip non-numeric values
  
        // Apply the filter based on the condition
        if (condition === '=') {
          if (row[column] !== numericValue) return false; // Check for exact match
        } else if (condition === '>') {
          if (row[column] <= numericValue) return false; // Check if greater than value
        } else if (condition === '<') {
          if (row[column] >= numericValue) return false; // Check if less than value
        }
      }
      return true; // Only return rows that satisfy all conditions
    });
  }, [data, filterConditions]);
  
  

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
      .filter(
        (key) =>
          key !== 'total_ai' &&
          key !== 'port_number' &&
          key !== 'bt_time' &&
          key !== 'setting_value' &&
          key !== 'wallet_address'
      )
      .map((key) => ({
        Header: (
          <div>
            {key}
            {numericColumns.includes(key) && (
              <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                <select
                  onChange={(e) =>
                    handleFilterChange(key, e.target.value, filterConditions[key]?.value || '')
                  }
                >
                  <option value="=">=</option>
                  <option value=">">&gt;</option>
                  <option value="<">&lt;</option>
                </select>
                <input
                  type="number"
                  onChange={(e) =>
                    handleFilterChange(key, filterConditions[key]?.condition || '=', e.target.value)
                  }
                  value={filterConditions[key]?.value || ''}
                  style={{ width: '80px', textAlign: 'center' }}
                />
              </div>
            )}
            {textColumns.includes(key) && (
              <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                <select
                  onChange={(e) =>
                    handleFilterChange(key, e.target.value, filterConditions[key]?.value || '')
                  }
                >
                  <option value="exact">Exact</option>
                  <option value="contain">Contain</option>
                </select>
                <input
                  type="text"
                  onChange={(e) =>
                    handleFilterChange(key, filterConditions[key]?.condition || 'exact', e.target.value)
                  }
                  value={filterConditions[key]?.value || ''}
                  style={{ width: '120px', TextAlign: 'center'  }}
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <h1
        style={{ margin: '20px 0', cursor: 'pointer' }}
        onClick={() => setIsSidebarVisible(!isSidebarVisible)}
      >
        World Bot API
      </h1>
      <div style={{ display: 'flex', height: '100%' }}>
        {isSidebarVisible && (
          <div className="sidebar" style={{ width: '250px', backgroundColor: '#333', color: '#fff', padding: '20px' }}>
            <button>Performance</button>
            <button>Bot Buffet API</button>
            <button>Tutorial</button>
            <button>Download</button>
            <button>BT Ranking</button>
            <button>Ask AI</button>
            <button>Upgrade</button>
            <button>Contact</button>
          </div>
        )}
        <div style={{ flex: 1, padding: '20px' }}>
          {/* Main content and table */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div
                style={{
                  flex: '1',
                  overflow: 'auto', // Make the table scrollable
                  border: '2px solid Navy',
                  marginBottom: '20px',
                }}
              >
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
                                height: '20px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                textAlign: 'center',
                              }}
                            >
                              <div
                                style={{
                                  maxHeight: '100%',
                                  overflowY: 'auto',
                                  whiteSpace: 'normal',
                                  height: '100%',
                                }}
                              >
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
              <div style={{ marginTop: '20px' }}>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                  {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                  {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                  {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                  {'>>'}
                </button>{' '}
                <span>
                  Page{' '}
                  <strong>
                    {pageIndex + 1} of {pageOptions.length}
                  </strong>{' '}
                </span>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                >
                  {[10, 20, 50, 100].map((size) => (
                    <option key={size} value={size}>
                      Show {size}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
