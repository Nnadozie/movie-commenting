import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTable } from 'react-table';
import { Movie } from '../state/reducer';
import { useNavigate } from 'react-router-dom';
import { useChatContext } from '../state/store';

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

  const data = useMemo(() => movies ?? [], [movies]);

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
  const tableInstance = useTable<any>({ columns, data });

  //return <Link to={'/got/comments'}>Movies</Link>;
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
  const navigate = useNavigate();

  function rowClick(row: Movie) {
    console.log(row);
    navigate(`/movies/${row.title}/${row.runtime}/comments`);
  }

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th {...column.getHeaderProps()}>
                      {
                        // Render the header
                        column.render('Header')
                      }
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()} onClick={() => rowClick(row.original)}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render('Cell')
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </>
  );
}

export default Movies;
