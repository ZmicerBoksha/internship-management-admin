import { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import { createStyles, CssBaseline, makeStyles } from '@material-ui/core';
import { TableInstance } from 'react-table';
import { useHistory } from 'react-router';
import { eventsApi } from '../../api/api';
import { Columns } from './columns/columns';
import Preloader from '../common/preloader/preloader';
import Table from '../common/table/table';
import SnackbarInfo from '../common/snackbarInfo/snackbarInfo';
import { IEvent } from './events-config';
import { SnackbarContext, TSnackbar } from '../common/snackbarInfo/snackbarContext';
import { PreloaderContext } from '../common/preloader/preloaderContext';

const useStyles = makeStyles(() => {
  return createStyles({
    pageWrap: {
      maxWidth: '100%',
      position: 'relative',
      padding: 0,
      paddingLeft: 25,
      paddingRight: 25,
      marginTop: 35,
      marginBottom: 35,
      '& div': {
        padding: 0,
      },
    },
  });
});

const Events: FunctionComponent = () => {
  const classes = useStyles();

  const [searchParams, setSearchParams] = useState<string>('');
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [snackbar, setSnackbar] = useState<TSnackbar>({});

  const columns = useMemo(() => Columns, []);

  const [data, setData] = useState([]);

  async function getData(searchParam?: string) {
    await eventsApi
      .getEvents(searchParam)
      .then(response => {
        setData(response.content);
      })
      .then(() => {
        setLoadingData(false);
      });
  }

  useEffect(() => {
    loadingData && getData();
  }, [loadingData]);

  useEffect(() => {
    getData(searchParams);
  }, [searchParams]);

  const history = useHistory();

  const addEvent = useCallback(() => {
    history.push(`/events/new`);
  }, []);

  const editEvent = useCallback((instance: TableInstance<IEvent>) => {
    const eventID = instance.selectedFlatRows[0].original!.id;
    history.push(`/events/info/${eventID}?mode=edit`);
  }, []);

  const deleteEvents = useCallback((instance: TableInstance<IEvent>) => {
    const arrayDeletePromises = instance.selectedFlatRows.map(item => eventsApi.deleteEvent(Number(item.original.id)));
    Promise.all(arrayDeletePromises)
      .then(() => {
        setSnackbar({
          isOpen: true,
          alertSeverity: 'success',
          alertMessage: 'Events were deleted.',
        });
      })
      .then(() => setLoadingData(true));
  }, []);

  return (
    <SnackbarContext.Provider value={{ snackbar, setSnackbar }}>
      <PreloaderContext.Provider value={{ loadingData, setLoadingData }}>
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
              setSearchParams={setSearchParams}
            />
          )}
          {snackbar?.isOpen && (
            <SnackbarInfo
              isOpen={snackbar.isOpen}
              alertSeverity={snackbar.alertSeverity}
              alertMessage={snackbar.alertMessage}
            />
          )}
        </div>
      </PreloaderContext.Provider>
    </SnackbarContext.Provider>
  );
};

export default Events;
