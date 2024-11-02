import React, { useEffect, useState } from 'react';
import supabase from '../src/supabaseClient';
import { useTable, usePagination, useSortBy } from 'react-table';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      let page = 1;
      let pageSize = 1000; // ขนาดของชุดข้อมูลที่ดึงมาแต่ละครั้ง

      while (true) {
        const { data: userData, error } = await supabase
          .from('list')
          .select('*')
          .order('id', { ascending: false }) // จัดเรียงข้อมูลโดย ID จากมากไปน้อย
          .range((page - 1) * pageSize, page * pageSize - 1); // ดึงข้อมูลเป็นช่วง

        if (error) {
          console.error('Error fetching data:', error);
          break;
        }

        if (userData.length === 0) break; // ถ้าไม่มีข้อมูลแล้วให้หยุด
        allData = [...allData, ...userData];
        page++;
      }

      setData(allData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const columns = React.useMemo(
    () =>
      data.length > 0
        ? Object.keys(data[0]).map((key) => ({
            Header: key,
            accessor: key,
          }))
        : [],
    [data]
  );

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
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 100,
        sortBy: [
          {
            id: 'id',
            desc: false,
          },
        ],
      },
    },
    useSortBy,
    usePagination
  );

  return (
    <div>
      <h1>World Bot API</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table {...getTableProps()} style={{ border: '1px solid black', width: '100%', marginBottom: '20px' }}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} style={{ background: '#f0f0f0' }}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      style={{
                        border: '1px solid black',
                        padding: '5px',
                        cursor: 'pointer',
                      }}
                    >
                      {column.render('Header')}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
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
                          border: '1px solid black',
                          padding: '5px',
                          height: '80px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
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
          <div>
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
  );
}
