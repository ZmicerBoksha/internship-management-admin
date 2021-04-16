import { createStyles, IconButton, makeStyles, Theme, Toolbar, Tooltip } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { FunctionComponent, MouseEventHandler } from "react";
import { TableInstance } from "react-table";
import ColumnHidePage from "../ColumnHidePage/ColumnHidePage";
import TableFilters from "../TableFilters/TableFilters";
import GlobalFilter from "../filters/GlobalFilter";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      border: '1px solid rgba(224, 224, 224, 1)',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottom: 'none',
      background: "#fff",
      position: 'sticky',
      top: 0
    },
    left_icons: {
      display: 'flex',
      alignItems: 'center'
    },
    right_icons: {
      display: 'flex',
      alignItems: 'center'
    }
  })
})

type TableToolbarProps = {
  instance: TableInstance,
  onAdd?: (instance: TableInstance) => void
  onEdit?: (instance: TableInstance) => void
}

const TableToolbar: FunctionComponent<TableToolbarProps> = ({ instance, onAdd, onEdit }) => {
  const classes = useStyles();
  const {state} = instance;

  return (
    <Toolbar className={classes.toolbar}>
      <div className={classes.left_icons}>
        {onAdd && 
          <Tooltip title="Add new event">
            <div>
              <IconButton 
                onClick={() => onAdd(instance)} 
                aria-label="Add new event"
                disabled={!!Object.keys(state.selectedRowIds).length}
              >
                <AddIcon />
              </IconButton>
            </div>
          </Tooltip>
        }
        {onEdit &&
          <Tooltip title="Edit event">
            <div>
              <IconButton 
                onClick={() => onEdit(instance)} 
                aria-label="Edit event"
                disabled={!(Object.keys(state.selectedRowIds).length === 1)}
              >
                <EditIcon />
              </IconButton>
            </div>
          </Tooltip>
        }        
      </div>  
      <div className={classes.right_icons}>
        <GlobalFilter 
          instance={instance} 
        />
        <ColumnHidePage 
          instance={instance} 
        />
        <TableFilters 
          instance={instance} 
        />
      </div>
    </Toolbar>
  )
}

export default TableToolbar;
