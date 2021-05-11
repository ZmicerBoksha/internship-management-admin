import React, { useState, FunctionComponent } from 'react';
import Axios from 'axios';
import LRU from 'lru-cache';
import { configure } from 'axios-hooks';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/sass/styles.scss';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';
import { Button } from '@material-ui/core';

const axios = Axios.create({
  baseURL: 'http://localhost:8085/api',
});
const cache = new LRU({ max: 10 });

configure({ axios, cache });

const localizer = momentLocalizer(moment);

/*
1 студент выбирает доступное время
2 тс выбирает доступное время
3 hr букает собес

student [{10.20.21, accepted: 'tsId'}]

ts  [{10.20.21, accepted: 'userId'}]
ts  [{10.20.21, accepted: 'userId'}]
ts  [{10.20.21, accepted: 'userId'}]

hr backend work with above 2

student [{10.20.21, accepted: 'tsId'}]
student [{10.20.21, accepted: 'tsId'}]
student [{10.20.21, accepted: 'tsId'}]

ts  [{10.20.21, accepted: 'userId'}]


hr backend work with above 2*/

const CandidateSchedule = () => {
  type Event = {
    start: Date;
    end: Date;
    title: string;
    meta: string;
  };
  const initialEvents: Event[] = [];

  const [listOfEvents, setListOfEvents] = useState(initialEvents);

  const handleSelect = (e: any): void => {
    const title = window.prompt('New Event name');
    if (title) {
      e.slots.forEach((slot: Date) => {
        let event = {
          start: slot,
          end: moment(slot).add(30, 'm').toDate(),
          title: title,
          meta: '',
        };

        setListOfEvents(prevState => [...prevState, event]);
      });
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setListOfEvents(initialEvents);
    //POST request with data in UFC Format
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Calendar
        selectable={true}
        views={['week']}
        defaultView={'week'}
        onNavigate={e => console.log('надо сохранить если мы переключаем неделю')}
        localizer={localizer}
        events={listOfEvents}
        startAccessor="start"
        onSelectEvent={event => console.log(event)}
        onSelectSlot={e => handleSelect(e)}
        endAccessor="end"
        style={{ height: 600, width: '100%' }}
      />
      <Button style={{ marginTop: '10px' }} variant="contained" color="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default CandidateSchedule;
