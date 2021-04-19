import {
  createStyles,
  makeStyles,
  TablePagination as MyTablePagination,
} from "@material-ui/core";
import { FunctionComponent, MouseEvent, useCallback } from "react";
import { TableInstance } from "react-table";

const useStyles = makeStyles(() => {
  return createStyles({
    custom_pagination: {
      background: "#fff",
      border: "1px solid rgba(224, 224, 224, 1)",
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10,
    },
  });
});

type TablePaginationProps = {
  instance: TableInstance;
};

const TablePagination: FunctionComponent<TablePaginationProps> = ({
  instance,
}) => {
  const classes = useStyles();

  const {
    state: { pageIndex, pageSize },
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = instance;

  const handleChangePage = useCallback(
    (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      if (newPage === pageIndex + 1) {
        nextPage();
      } else if (newPage === pageIndex - 1) {
        previousPage();
      } else {
        gotoPage(newPage);
      }
    },
    [gotoPage, nextPage, pageIndex, previousPage]
  );

  const handleChangeRowsPerPage = useCallback(
    (event) => {
      setPageSize(Number(event.target.value));
    },
    [setPageSize]
  );

  return (
    <MyTablePagination
      className={classes.custom_pagination}
      rowsPerPageOptions={[10, 25, 50, 100]}
      component="div"
      count={instance.rows.length}
      rowsPerPage={pageSize}
      page={pageIndex}
      SelectProps={{
        inputProps: { "aria-label": "rows per page" },
        native: true,
      }}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default TablePagination;
