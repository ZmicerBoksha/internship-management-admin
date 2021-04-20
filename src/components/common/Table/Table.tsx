import { FunctionComponent, MouseEventHandler, useMemo } from 'react';
import {
  TableInstance,
  useBlockLayout,
  useColumnOrder,
  useExpanded,
  useFilters,
  useFlexLayout,
  useGlobalFilter,
  useGroupBy,
  usePagination,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import DefaultColumnFilter from './filters/DefaultColumnFilter';
import TablePagination from './TablePagination/TablePagination';
import { createStyles, makeStyles, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import MaUTable from '@material-ui/core/Table';
import TableToolbar from './TableToolbar/TableToolbar';
import { selectionHook } from '../hooks/selectionHook';

const useStyles = makeStyles(() => {
  return createStyles({
    table_wrap: {
      overflowX: 'auto',
      overflowY: 'hidden',
    },
    table: {
      overflow: 'hidden',
      minWidth: '100%',
      borderSpacing: 0,
      border: '1px solid rgba(224, 224, 224, 1)',
      flex: '1 1 auto',
      background: '#fff',
    },
    table_head_row: {
      color: '#000',
      fontWeight: 700,
      lineHeight: 'normal',
      position: 'relative',
      borderBottom: '1px solid rgba(224, 224, 224, 1)',
      '&:hover $resizeHandle': {
        opacity: 1,
      },
    },
    table_head_cell: {
      padding: 15,
      fontSize: 16,
      textAlign: 'center',
      fontWeight: 700,
      borderRight: '1px solid rgba(224, 224, 224, 1)',
      background: '#fff',
      '&:last-child': {
        borderRight: 'none',
      },
    },
    table_sort_label: {
      '& svg': {
        width: 16,
        height: 16,
        marginTop: 0,
        marginLeft: 2,
      },
    },
    table_body: {
      display: 'flex',
      flex: '1 1 auto',
      width: '100%',
      flexDirection: 'column',
    },
    table_row: {
      color: 'inherit',
      outline: 0,
      verticalAlign: 'middle',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.07)',
      },
      borderBottom: '1px solid rgba(224, 224, 224, 1)',
      '&:last-child': {
        borderBottom: 'none',
      },
    },
    table_cell: {
      padding: 10,
      fontSize: 14,
      textAlign: 'left',
      fontWeight: 400,
      borderRight: '1px solid rgba(224, 224, 224, 1)',
      '&:last-child': {
        borderRight: 'none',
      },
      '& img': {
        width: '100%',
        objectFit: 'cover',
      },
    },
  });
});

type TableProps = {
  name: string;
  columns: any;
  data: any;
  onAdd?: (instance: TableInstance) => void;
  onEdit?: (instance: TableInstance) => void;
};

const Table: FunctionComponent<TableProps> = ({ name, columns, data, onAdd, onEdit }) => {
  const classes = useStyles();

  const filterTypes = {};

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    [],
  );

  const instance = useTable(
    {
      columns,
      data,
      filterTypes,
      defaultColumn,
    },
    useColumnOrder,
    useFilters,
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
    useFlexLayout,
    usePagination,
    useResizeColumns,
    useRowSelect,
    useBlockLayout,
    selectionHook,
  );

  const { getTableProps, headerGroups, getTableBodyProps, page, prepareRow } = instance;

  return (
    <>
      <TableToolbar instance={instance} {...{ onAdd, onEdit }} />
      <div className={classes.table_wrap}>
        <MaUTable stickyHeader className={classes.table}>
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()} className={classes.table_head_row}>
                {headerGroup.headers.map(column => (
                  <TableCell {...column.getHeaderProps()} className={classes.table_head_cell}>
                    {column.canSort ? (
                      <TableSortLabel
                        active={column.isSorted}
                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                        {...column.getSortByToggleProps()}
                        className={classes.table_sort_label}
                      >
                        {column.render('Header')}
                      </TableSortLabel>
                    ) : (
                      <>{column.render('Header')}</>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()} className={classes.table_body}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()} className={classes.table_row}>
                  {row.cells.map(cell => {
                    return (
                      <TableCell {...cell.getCellProps()} className={classes.table_cell}>
                        {cell.render('Cell')}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MaUTable>
      </div>
      <TablePagination instance={instance} />
    </>
  );
};

export default Table;

{
  /* <div {...getTableProps()} className={classes.table_wrap}>
<div>
  {
    headerGroups.map(headerGroup => {
      return (
        <div {...headerGroup.getHeaderGroupProps()} className={classes.table_head_row}>
          {
            headerGroup.headers.map(column => {
              return (
                <div {...column.getHeaderProps(column.getSortByToggleProps())} className={classes.table_head_cell}>
                  {column.canSort ? (
                    <TableSortLabel
                      active={column.isSorted}
                      direction={column.isSortedDesc ? 'desc' : 'asc'}
                      {...column.getSortByToggleProps()}
                      className={classes.table_sort_label}
                    >
                      {column.render('Header')}
                    </TableSortLabel>
                  ) : (
                    <div>
                      {column.render('Header')}
                    </div>
                  )}
                </div>
              )
            })
          }
        </div>
      )
    })
  }
</div>
<div {...getTableBodyProps()} className={classes.table_body}>
  {
    page.map(row => {
      prepareRow(row)
      return (
        <div {...row.getRowProps()} className={classes.table_row}>
          {
            row.cells.map(cell => {
              return (
                <div {...cell.getCellProps()} className={classes.table_cell}>
                  {
                    cell.isAggregated ? (
                      cell.render('Aggregated')
                    ) : cell.isPlaceholder ? null : (
                      cell.render('Cell')
                    )
                  }
                </div>
              )
            })
          }
        </div>
      )
    })
  }
</div>
</div> */
}
