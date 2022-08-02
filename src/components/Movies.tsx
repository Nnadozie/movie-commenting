// @ts-nocheck
import { useEffect, useMemo } from 'react';
import axios from 'axios';
import { useTable, useFilters } from 'react-table';
import { Movie } from '../state/reducer';
import { useNavigate } from 'react-router-dom';
import { useChatContext } from '../state/store';
import {
  DataTable,
  DataTableCell,
  DataTableHeadCell,
  DataTableRow,
  DataTableBody,
  DataTableHead,
} from '@rmwc/data-table';

import '@material/data-table/dist/mdc.data-table.css';
import '@rmwc/data-table/data-table.css';
import '@rmwc/icon/icon.css';

function DefaultColumnFilter({ column: { filterValue, preFilteredRows, setFilter } }: any) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function Movies() {
  const { dispatch, movies } = useChatContext();

  useEffect(() => {
    if (!movies) {
      axios
        .get('https://movies-backend-proxy.herokuapp.com/movies')
        .then((res) => {
          dispatch({ type: 'SET_MOVIES', value: res.data });
        })
        .catch((reason) => console.log(reason));
    }
  }, []);

  const filterTypes = useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      // Or, override the default text filter to use
      // "startWith"
      text: (rows: any, id: any, filterValue: any) => {
        return rows.filter((row: any) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    [],
  );

  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    [],
  );

  const columns = useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title', // accessor is the "key" in the data
      },
      {
        Header: 'Year',
        accessor: 'year',
      },
      {
        Header: 'Runtime',
        accessor: 'runtime',
      },
      {
        Header: 'Revenue',
        accessor: 'revenue',
      },
      {
        Header: 'Rating',
        accessor: 'rating',
      },
      {
        Header: 'Genres',
        accessor: 'genre',
      },
    ],
    [],
  );

  const data = useMemo(() => movies ?? [], [movies]);

  const tableInstance = useTable<any>({ columns, data, defaultColumn, filterTypes }, useFilters);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  const navigate = useNavigate();

  function rowClick(row: Movie) {
    navigate(`/movies/${row.title}/${row.runtime}/comments`);
  }

  return !movies ? (
    <p>{'Loading...'}</p>
  ) : (
    <DataTable {...getTableProps()} style={{ width: '100vw' }}>
      <DataTableHead>
        {headerGroups.map((headerGroup) => (
          <DataTableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <DataTableHeadCell {...column.getHeaderProps()}>
                {column.render('Header')}
                <div>{column.canFilter ? column.render('Filter') : null}</div>
              </DataTableHeadCell>
            ))}
          </DataTableRow>
        ))}
      </DataTableHead>
      <DataTableBody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <DataTableRow {...row.getRowProps()} onClick={() => rowClick(row.original)} style={{ cursor: 'pointer' }}>
              {row.cells.map((cell) => {
                return <DataTableCell {...cell.getCellProps()}>{cell.render('Cell')}</DataTableCell>;
              })}
            </DataTableRow>
          );
        })}
      </DataTableBody>
    </DataTable>
  );
}

export default Movies;
