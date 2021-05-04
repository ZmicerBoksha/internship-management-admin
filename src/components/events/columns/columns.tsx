import { SelectColumnFilter } from '../../common/table/filters/selectColumnFilter';
import MenuIcon from '@material-ui/icons/Menu';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { Button, createStyles, IconButton, makeStyles, Popover } from '@material-ui/core';
import { useState, FunctionComponent, MouseEvent } from 'react';
import { useHistory } from 'react-router';
import { eventsApi } from '../../../api/api';
import BetweenDatesFilter from '../../common/table/filters/betweenDatesFilter';
import { usePreloaderContext, useSnackbarContext } from '../eventsContext';

const useStyles = makeStyles(() => {
  return createStyles({
    button_wrap: {
      padding: 0,
      color: '#000',
    },
    popover_content_wrap: {
      padding: 7,
    },
    popover_button: {
      padding: 5,
      width: '100%',
      '& .MuiButton-label': {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      },
    },
    good_buttons: {
      borderBottom: '1px solid #000',
      marginBottom: 10,
      paddingBottom: 10,
    },
    bad_buttons: {},
  });
});

type TFirstColumnSettings = {
  rowId: number;
};

const FirstColumnSettings: FunctionComponent<TFirstColumnSettings> = ({ rowId }) => {
  const classes = useStyles();

  const { loadingData, setLoadingData } = usePreloaderContext();
  const { snackbar, setSnackbar } = useSnackbarContext();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const openRowPopover = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeRowPopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const firstColumn = open ? 'simple-popover' : undefined;

  const history = useHistory();
  const showInfoEvent = () => {
    history.push(`/events/info/${rowId}`);
  };

  const editInfoEvent = () => {
    history.push(`/events/info/${rowId}?mode=edit`);
  };

  const showCandidates = () => {
    console.log('showCandidates');
  };

  const deleteEvent = () => {
    eventsApi
      .deleteEvent(Number(rowId))
      .then(() => {
        setSnackbar({
          isOpen: true,
          alertSeverity: 'success',
          alertMessage: 'Event was delete.',
        });
      })
      .then(() => setLoadingData(true));
  };

  return (
    <>
      <IconButton
        component="span"
        aria-describedby={firstColumn}
        onClick={openRowPopover}
        className={classes.button_wrap}
      >
        <MenuIcon />
      </IconButton>
      <Popover
        id={firstColumn}
        open={open}
        anchorEl={anchorEl}
        onClose={closeRowPopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className={classes.popover_content_wrap}>
          <div className={classes.good_buttons}>
            <div>
              <Button className={classes.popover_button} startIcon={<InfoIcon />} onClick={showInfoEvent}>
                Show info
              </Button>
            </div>
            <div>
              <Button className={classes.popover_button} startIcon={<EditIcon />} onClick={editInfoEvent}>
                Edit event
              </Button>
            </div>
            <div>
              <Button className={classes.popover_button} startIcon={<PeopleAltIcon />} onClick={showCandidates}>
                Show candidates
              </Button>
            </div>
          </div>
          <div className={classes.bad_buttons}>
            <div>
              <Button
                color="secondary"
                className={classes.popover_button}
                startIcon={<DeleteIcon />}
                onClick={deleteEvent}
              >
                Delete event
              </Button>
            </div>
          </div>
        </div>
      </Popover>
    </>
  );
};

export const Columns = [
  {
    minWidth: 60,
    width: 60,
    maxWidth: 60,
    Header: '',
    accessor: 'actions',
    disableResizing: true,
    disableGroupBy: true,
    disableFilters: true,
    disableGlobalFilter: true,
    alwaysVisible: true,
    Cell: (props: any) => {
      const rowId = props.row.original.id;
      return <FirstColumnSettings rowId={rowId} />;
    },
  },
  {
    Header: 'Id',
    accessor: 'id',
    startHide: true,
  },
  {
    Header: 'Event custom info',
    columns: [
      {
        Header: 'Tab',
        accessor: 'eventTab',
        Filter: SelectColumnFilter,
        filter: 'includes',
        isVisible: true,
        startHide: true,
      },
      {
        Header: 'Format',
        accessor: 'format',
        Filter: SelectColumnFilter,
        filter: 'includes',
        startHide: true,
      },
    ],
  },
  {
    Header: 'Name and description',
    columns: [
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Description',
        accessor: 'description',
        startHide: true,
      },
    ],
  },
  {
    Header: 'Dates info',
    columns: [
      {
        Header: 'Event start',
        accessor: 'startDate',
        Filter: BetweenDatesFilter,
        filter: 'betweenDates',
      },
      {
        Header: 'Event finish',
        accessor: 'deadline',
        Filter: BetweenDatesFilter,
        filter: 'betweenDates',
      },
      {
        Header: 'Date end of acceptin',
        accessor: 'dateOfEndAccept',
        Filter: BetweenDatesFilter,
        filter: 'betweenDates',
        startHide: true,
      },
      {
        Header: 'Event duration',
        accessor: 'duration',
        startHide: true,
      },
    ],
  },
  {
    Header: 'Image info',
    columns: [
      {
        Header: 'Src',
        accessor: 'image',
        disableFilters: true,
        Cell: (props: any) => {
          return (
            <>
              <img src={`${props.cell.value.path}.${props.cell.value.ext}`} alt={`${props.cell.value.altText}`} />
            </>
          );
        },
      },
      {
        Header: 'Alt text',
        accessor: 'image.altText',
        disableFilters: true,
        startHide: true,
      },
    ],
  },
  {
    Header: 'City',
    accessor: 'city',
    startHide: true,
  },
  {
    Header: 'Location',
    columns: [
      {
        Header: 'Country',
        accessor: 'country',
        Filter: SelectColumnFilter,
        filter: 'includes',
        startHide: true,
      },
      {
        Header: 'City',
        accessor: 'city',
        startHide: true,
      },
    ],
  },
  {
    Header: 'Info create',
    columns: [
      {
        Header: 'Who created event (userId)',
        accessor: 'creatorEvent',
        startHide: true,
        Cell: (props: any) => {
          const { cell } = props;
          return <>{`${cell.value.empFirstName} ${cell.value.empLastName} (${cell.value.role.name})`}</>;
        },
      },
      {
        Header: 'Event created at',
        accessor: 'creatorEvent.createdAt',
        startHide: true,
      },
    ],
  },
];
