import { createStyles, makeStyles, TablePagination as MyTablePagination } from '@material-ui/core';
import { FunctionComponent, MouseEvent, useCallback, useEffect, useState } from 'react';
import { TableInstance } from 'react-table';

const useStyles = makeStyles(() => {
  return createStyles({
    custom_pagination: {
      background: '#fff',
      border: '1px solid rgba(224, 224, 224, 1)',
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
    },
  });
});

type TablePaginationProps = {
  instance: TableInstance;
  fetchRequest?: (pageSize: number, pageIndex: number) => void;
};

type TTablePagination = {
  countRows?: number;
  countPages?: number;
};

const TablePagination: FunctionComponent<TTablePagination> = ({ countRows, countPages }) => {
  const classes = useStyles();

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <MyTablePagination
      className={classes.custom_pagination}
      component="div"
      rowsPerPageOptions={[10, 15, 25, 50]}
      count={countRows || 0}
      rowsPerPage={rowsPerPage}
      page={page}
      SelectProps={{
        inputProps: { 'aria-label': 'rows per page' },
        native: true,
      }}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default TablePagination;
