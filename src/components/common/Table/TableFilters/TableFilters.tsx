import { Button, createStyles, IconButton, makeStyles, Popover, Theme, Tooltip, Typography } from "@material-ui/core";
import { FormEvent, FunctionComponent, MouseEvent, useCallback, useState } from "react";
import { TableInstance } from "react-table";
import FilterListIcon from '@material-ui/icons/FilterList';

const ID_FILTERS_HIDE = 'ArtHan/ID_FILTERS_HIDE';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    columns_pop_over: {
      padding: 15,
    },
    popover_title: {
      fontSize: 20,
      fontWeight: 700,
      textTransform: 'uppercase',
      textDecoration: 'underline',
      marginBottom: 15
    },
    filters_reset_button: {
      position: 'absolute',
      top: 18,
      right: 21,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 215px)',
      gridColumnGap: 20,
      gridRowGap: 20,
    },
    cell: {
      width: '100%',
      display: 'inline-flex',
      flexDirection: 'column',
    },
    hidden: {
      display: 'none',
    },
  })
})

type TableFiltersProps = {
  instance: TableInstance
}

const TableFilters: FunctionComponent<TableFiltersProps> = ({ instance }) => {
  const { allColumns, setAllFilters } = instance;

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const handleFiltersClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setFiltersOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setFiltersOpen(false);
  };

  const onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleClose()
  },
    [handleClose]
  )

  const resetFilters = useCallback(() => {
    setAllFilters([])
  }, [setAllFilters])

  return (
    <>
      <Tooltip title="Filter by columns">
        <IconButton onClick={handleFiltersClick} aria-label="Filter by columns">
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Popover
        id={ID_FILTERS_HIDE}
        open={filtersOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className={classes.columns_pop_over}>
          <Typography className={classes.popover_title}>Filters</Typography>
          <form onSubmit={onSubmit}>
            <Button onClick={resetFilters} className={classes.filters_reset_button}>Reset</Button>
            <div className={classes.grid}>
              {allColumns
                .filter(item => item.canFilter)
                .map(column => {
                  return (
                    <div
                      key={column.id}
                      className={classes.cell}
                    >
                      {column.render('Filter')}
                    </div>
                  )
                })
              }
            </div>
            <button className={classes.hidden} type="submit">
              &nbsp;
            </button>
          </form>
        </div>
      </Popover>

    </>
  )
}

export default TableFilters