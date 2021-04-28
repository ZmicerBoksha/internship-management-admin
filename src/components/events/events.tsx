import { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import { createStyles, CssBaseline, makeStyles } from '@material-ui/core';
import { TableInstance } from 'react-table';
import { useHistory } from 'react-router';
import { eventsApi } from '../../api/api';
import { Columns } from './columns/columns';
import Preloader from '../common/preloader/preloader';
import Table from '../common/table/table';
import SnackbarInfo from '../common/snackbarInfo/snackbarInfo';

const useStyles = makeStyles(() => {
  return createStyles({
    pageWrap: {
      position: 'relative',
      paddingLeft: 25,
      paddingRight: 25,
      marginTop: 35,
      marginBottom: 35,
    },
  });
});

interface IEvent {
  id?: string | number;
}

const Events: FunctionComponent = () => {
  const classes = useStyles();
  const [loadingData, setLoadingData] = useState<Boolean>(true);

  const [openSnackbar, setopenSnackbar] = useState<boolean>(false);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'warning' | 'info' | undefined>(undefined);
  const [alertMessage, setAlertMessage] = useState<string | undefined>(undefined);

  const columns = useMemo(() => Columns, []);

  const [data, setData] = useState([]);

  async function getData() {
    await eventsApi.getEvents().then(response => {
      setData(response.content);
      setLoadingData(false);
    });
  }

  useEffect(() => {
    loadingData && getData();
  }, []);

  const history = useHistory();

  const addEvent = useCallback(() => {
    history.push(`/events/new`);
  }, []);

  const editEvent = useCallback((instance: TableInstance<IEvent>) => {
    const eventID = instance.selectedFlatRows[0].original!.id;
    history.push(`/events/info/${eventID}?mode=edit`);
  }, []);

  const deleteEvents = useCallback((instance: TableInstance<IEvent>) => {
    setLoadingData(true);

    const arrayDeletePromises = instance.selectedFlatRows.map(item => eventsApi.deleteEvent(Number(item.original.id)));

    Promise.all(arrayDeletePromises).then(() => {
      setLoadingData(false);
      setopenSnackbar(true);
      setAlertSeverity('success');
      setAlertMessage('Events were deleted.');

      getData();
    });
  }, []);

  return (
    <div className={classes.pageWrap}>
      <CssBaseline />
      {loadingData ? (
        <Preloader />
      ) : (
        <Table
          name="Events table"
          columns={columns}
          data={data}
          onAdd={addEvent}
          onEdit={editEvent}
          onDelete={deleteEvents}
        />
      )}
      {openSnackbar && <SnackbarInfo isOpen={openSnackbar} alertSeverity={alertSeverity} alertMessage={alertMessage} />}
    </div>
  );
};

export default Events;
