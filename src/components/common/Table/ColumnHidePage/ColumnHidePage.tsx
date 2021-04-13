import { Checkbox, createStyles, FormControlLabel, IconButton, makeStyles, Popover, Theme, Tooltip, Typography } from "@material-ui/core";
import { FunctionComponent, useState } from "react";
import { TableInstance } from "react-table";
import ViewColumnIcon from '@material-ui/icons/ViewColumn';

const ID_COLUMNS_HIDE = 'ArtHan/ID_COLUMNS_HIDE';

const useStyle = makeStyles((theme: Theme) => {
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
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 255px)',
      gridColumnGap: 15,
      gridRowGap: 15,
    },
  })
})

type ColumnHidePageProps = {
  instance: TableInstance
}

const ColumnHidePage: FunctionComponent<ColumnHidePageProps> = ({ instance }) => {
  const { allColumns, toggleHideColumn } = instance;

  const classes = useStyle({});

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [columnsOpen, setColumnsOpen] = useState(false);  

  const handleColumnsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setColumnsOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setColumnsOpen(false);
  };

  const hideableColumns = allColumns.filter((column) => !(column.id === '_selector'))
  const checkedCount = hideableColumns.reduce((acc, val) => acc + (val.isVisible ? 0 : 1), 0)

  const onlyOneOptionLeft = checkedCount + 1 >= hideableColumns.length

  return hideableColumns.length > 1 ? (
    <>
      <Tooltip title="Show / hide columns">
        <IconButton onClick={handleColumnsClick} aria-label="Show / hide columns">
          <ViewColumnIcon />
        </IconButton>
      </Tooltip>
      <Popover
        id={ID_COLUMNS_HIDE}
        open={columnsOpen}
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
          <Typography className={classes.popover_title}>Visible columns</Typography>
          <div className={classes.grid}>
            {hideableColumns.map((column) => (
              <FormControlLabel
                key={column.id}
                control={
                  <Checkbox
                    value={`${column.id}`}
                    disabled={column.isVisible && onlyOneOptionLeft}
                    color="primary"
                  />
                }
                label={column.render('Header')}
                checked={column.isVisible}
                onChange={() => toggleHideColumn(column.id, column.isVisible)}
              />
            ))}
          </div>
        </div>
      </Popover>
    </>
  ) : null
}


export default ColumnHidePage;
