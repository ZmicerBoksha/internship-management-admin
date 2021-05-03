import { createStyles, makeStyles, Switch, Typography } from '@material-ui/core';
import { FunctionComponent, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router';
import { eventsApi, IEventForm } from '../../../api/api';
import Preloader from '../../common/preloader/preloader';
import SnackbarInfo from '../../common/snackbarInfo/snackbarInfo';
import EventForm from '../eventForm/eventForm';

const useStyles = makeStyles(() => {
  return createStyles({
    pageWrap: {
      position: 'relative',
      paddingLeft: 25,
      paddingRight: 25,
      marginTop: 35,
      marginBottom: 35,
    },
    page_title: {
      fontSize: 38,
      fontWeight: 700,
    },
  });
});

type TUrl = {
  eventId?: string;
  eventType: 'new' | 'info';
};

const EventInfo: FunctionComponent = () => {
  const classes = useStyles();
  const { eventId, eventType } = useParams<TUrl>();

  const mode = new URLSearchParams(useLocation().search).get('mode');

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [eventData, setEventData] = useState<IEventForm | null>(null);

  async function getEventData(id: string) {
    await eventsApi.getEventInfo(id).then(response => {
      setEventData(response);
      setLoadingData(false);
    });
  }

  useEffect(() => {
    switch (eventType) {
      case 'info':
        eventId && getEventData(eventId);
        setIsEditMode(mode === 'edit');
        break;
      case 'new':
        setLoadingData(false);
        break;
      default:
        break;
    }
  }, [eventType]);

  const onSetIsEditMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isEditMode = event.target.checked;
    setIsEditMode(isEditMode);
  };

  return (
    <>
      {loadingData ? (
        <Preloader />
      ) : (
        <div className={classes.pageWrap}>
          <Typography component="h1" className={classes.page_title}>
            {eventId ? `Edit event (id = ${eventData!.id})` : `Add event`}
          </Typography>
          <>
            {eventType === 'info' && (
              <>
                <Typography component="h4">Edit mode</Typography>
                <Switch checked={isEditMode} onChange={onSetIsEditMode} color="primary" />
              </>
            )}
          </>
          <EventForm
            eventId={eventId}
            eventType={eventType}
            isEditMode={isEditMode}
            eventData={eventData}
            setLoadingData={setLoadingData}
            setIsEditMode={setIsEditMode}
          />
        </div>
      )}
    </>
  );
};

export default EventInfo;
