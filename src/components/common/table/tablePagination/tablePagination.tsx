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

export const rowsPerPageOptions: number[] = [1, 15, 25, 50];

type TTablePagination = {
  countRows?: number;
  page?: number;
  setPage?: (page: number) => void;
  rowsPerPage?: number;
  setItemsPerPage?: (itemsPerPage: number) => void;
};

const TablePagination: FunctionComponent<TTablePagination> = ({
  countRows,
  page,
  setPage,
  rowsPerPage,
  setItemsPerPage,
}) => {
  const classes = useStyles();

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage && setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setItemsPerPage && setItemsPerPage(parseInt(event.target.value, 10));
    setPage && setPage(0);
  };

  return (
    <MyTablePagination
      className={classes.custom_pagination}
      component="div"
      rowsPerPageOptions={rowsPerPageOptions}
      count={countRows || 0}
      rowsPerPage={rowsPerPage || rowsPerPageOptions[0]}
      page={page || 0}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default TablePagination;
