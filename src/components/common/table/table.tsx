import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
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
      padding: 0,
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
    resizeHandle: {
      position: 'absolute',
      cursor: 'col-resize',
      zIndex: 100,
      opacity: 0,
      borderLeft: `1px solid #000`,
      borderRight: `1px solid #000`,
      height: '50%',
      top: '25%',
      transition: 'all linear 100ms',
      right: -2,
      width: 3,
      '&.handleActive': {
        opacity: '1',
        border: 'none',
        backgroundColor: '#D90000',
        height: 'calc(100% - 4px)',
        top: '2px',
        right: -1,
        width: 1,
      },
    },
  });
});

type TableProps = {
  name: string;
  columns: any[];
  data: any;
  onAdd?: (instance: TableInstance) => void;
  onEdit?: (instance: TableInstance) => void;
  onDelete?: (instance: TableInstance) => void;
  setSearchParams?: (searchParams: string) => void;
  countRows?: number;
  pageNumberForBack?: number;
  setPage?: (page: number) => void;
  rowsPerPage?: number;
  setItemsPerPage?: (itemsPerPage: number) => void;
};

const Table: FunctionComponent<TableProps> = ({
  name,
  columns,
  data,
  onAdd,
  onEdit,
  onDelete,
  setSearchParams,
  countRows,
  pageNumberForBack,
  setPage,
  rowsPerPage,
  setItemsPerPage,
}) => {
  const classes = useStyles();

  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
      filter: 'searchLike',
      minWidth: 45,
      width: 150,
      maxWidth: 200,
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

  const { allColumns, headerGroups, getTableBodyProps, page, prepareRow, state } = instance;

  useEffect(() => {
    instance.state.hiddenColumns = allColumns.filter(column => column.hasOwnProperty('startHide')).map(({ id }) => id);
  }, []);

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
            filterParametrs += item.value ? `${item.id}=="${item.value}*";` : '';
            break;
        }
      });

    filterValues &&
      history.push({
        search: filterParametrs.substring(0, filterParametrs.length - 1),
      });

    setSearchParams && setSearchParams(filterParametrs.substring(0, filterParametrs.length - 1));
  }, [state.filters, countRows]);

  useEffect(() => {
    let globalFilterParametrs = '';

    instance.allColumns.forEach(column => {
      if (!column.disableGlobalFilter)
        globalFilterParametrs += state.globalFilter ? `${column.id}=="${state.globalFilter}*",` : '';
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
                    {column.canResize && (
                      <div
                        {...column.getResizerProps()}
                        style={{ cursor: 'col-resize' }}
                        className={classNames({
                          [classes.resizeHandle]: true,
                          handleActive: column.isResizing,
                        })}
                      />
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
      <TablePagination
        countRows={countRows}
        page={pageNumberForBack}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setItemsPerPage={setItemsPerPage}
      />
    </>
  );
};

export default Table;
