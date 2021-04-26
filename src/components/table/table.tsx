import React, { useState } from 'react';
// @ts-ignore
import { useTable, useSortBy } from 'react-table';
import InfiniteScroll from 'react-infinite-scroll-component';
import './styleTable.scss';
import CssBaseline from '@material-ui/core/CssBaseline';

// @ts-ignore
function Table({ columns, data, update }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { sortBy },
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
  );

  React.useEffect(() => {}, [sortBy]);

  return (
    <InfiniteScroll dataLength={rows.length} next={update} hasMore={true} loader={<h4>Loading more 2 itens...</h4>}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>{column.isSorted && (column.isSortedDesc ? ' 🔽' : ' 🔼') }</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row: any, i: any) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </InfiniteScroll>
  );
}

function CreateTable(tableConfiguration: any, serverData: any, updates: any) {
  const [items, setItems] = useState(serverData);

  const columns = React.useMemo(() => tableConfiguration, []);

  const fetchMoreData = () => {
    setTimeout(() => {
      setItems(items.concat(updates));
    }, 1500);
  };

  const data = React.useMemo(() => items, [items]);

  return (
    <div>
      <Table columns={columns} data={data} update={fetchMoreData} />
    </div>
  );
}

export default CreateTable;
