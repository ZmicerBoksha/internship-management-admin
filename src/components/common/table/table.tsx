import { FunctionComponent, useEffect, useMemo, useState } from 'react';
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
import { createStyles, makeStyles, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import MaUTable from '@material-ui/core/Table';
import { selectionHook } from '../hooks/selectionHook';
import DefaultColumnFilter from './filters/defaultColumnFilter';
import TableToolbar from './tableToolbar/tableToolbar';
import TablePagination from './tablePagination/tablePagination';
import { useHistory } from 'react-router';

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
  onDelete?: (instance: TableInstance) => void;
  fetchRequest?: (pageSize: number, pageIndex: number) => void;
  setSearchParams?: (searchParams: string) => void;
};

const Table: FunctionComponent<TableProps> = ({
  name,
  columns,
  data,
  onAdd,
  onEdit,
  onDelete,
  fetchRequest,
  setSearchParams,
}) => {
  const classes = useStyles();

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
      filter: 'searchLike',
    }),
    [],
  );

  const instance = useTable(
    {
      columns,
      data,
      manualFilters: true,
      manualGlobalFilter: true,
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

  const { headerGroups, getTableBodyProps, page, prepareRow, state } = instance;

  const history = useHistory();

  useEffect(() => {
    let filterParametrs = '';
    const filterValues = state.filters;
    filterValues &&
      filterValues.forEach(item => {
        switch (item.value[0]) {
          case 'includes':
            filterParametrs += item.value[1] ? `${item.id}=="${item.value[1]}";` : '';
            break;
          case 'betweenDates':
            filterParametrs += item.value[1] ? `${item.id}=ge="${item.value[1]}";` : '';
            filterParametrs += item.value[2] ? `${item.id}=le="${item.value[2]}";` : '';
            break;
          default:
            filterParametrs += item.value[1] ? `${item.id}=="${item.value[1]}*";` : '';
            break;
        }
      });

    filterValues &&
      history.push({
        search: filterParametrs.substring(0, filterParametrs.length - 1),
      });

    setSearchParams && setSearchParams(filterParametrs.substring(0, filterParametrs.length - 1));
  }, [state.filters]);

  useEffect(() => {
    let globalFilterParametrs = '';

    instance.allColumns.forEach(column => {
      if (!column.disableGlobalFilter)
        globalFilterParametrs += state.globalFilter ? `${column.id}=="${state.globalFilter}*";` : '';
    });

    setSearchParams && setSearchParams(globalFilterParametrs.substring(0, globalFilterParametrs.length - 1));
  }, [state.globalFilter]);

  return (
    <>
      <TableToolbar instance={instance} {...{ onAdd, onEdit, onDelete }} />
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
      <TablePagination instance={instance} fetchRequest={fetchRequest} />
    </>
  );
};

export default Table;
