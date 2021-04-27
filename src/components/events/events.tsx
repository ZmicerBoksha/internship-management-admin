import { 
  FunctionComponent, 
  useCallback, 
  useEffect, 
  useMemo, 
  useState } from 'react';
import { 
  createStyles, 
  CssBaseline, 
  makeStyles } from '@material-ui/core';
import Table from '../common/table/table';
import { TableInstance } from 'react-table';
import { useHistory } from 'react-router';
import { eventsApi } from '../../api/api';
import { Columns } from './columns/columns';
import Preloader from '../common/preloader/preloader';

const useStyles = makeStyles( () => {
  return createStyles({
    pageWrap : {
      position: 'relative',
      paddingLeft: 25,
      paddingRight: 25,
      marginTop: 35,
      marginBottom: 35
    }
  })
})

interface IEvent {
  id?: string | number
}

const Events: FunctionComponent = () => {
  const classes = useStyles();
  const [loadingData, setLoadingData] = useState<Boolean>(true);  
  const columns = useMemo(() => Columns, []);

  const [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      await eventsApi.getEvents()
        .then((response) => {          
          setData(response.content);
          setLoadingData(false);
        });
    }
    loadingData && getData()
  }, []);

  const history = useHistory();

  const addEvent = useCallback(
    () => {
      history.push(`/events/new`);
    },
    []
  );

  const editEvent = useCallback(
    (instance: TableInstance<IEvent>) => {
      const eventID = instance.selectedFlatRows[0].original!.id;
      history.push(`/events/info/${eventID}`);
    },
    []
  );

  const deleteEvents = useCallback(
    (instance: TableInstance<IEvent>) => {
      setLoadingData(true);
      instance.selectedFlatRows.forEach(item => {
        eventsApi.deleteEvent(Number(item.original.id));
      });
      setLoadingData(false);
    },
    []
  );

  return (
    <div className={classes.pageWrap}>
      <CssBaseline /> 
      {
        loadingData ? 
          <Preloader /> :
          <Table
            name={'Events table'}
            columns={columns}
            data={data}
            onAdd={addEvent}
            onEdit={editEvent}
            onDelete={deleteEvents}
          />
      }  
    </div>
  )
};

export default Events;