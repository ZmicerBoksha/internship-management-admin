import React, { useState, FunctionComponent, useEffect, useMemo } from 'react';
import Axios from 'axios';
import LRU from 'lru-cache';
import { configure } from 'axios-hooks';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/sass/styles.scss';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';
import { Button } from '@material-ui/core';


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

// @ts-ignore
const CandidateSchedule = ({slots, setTime}) => {
  type Event = {
    start: Date;
    end: Date;
    title: string;
  };
  const initialEvents: any = [];

  const [listOfEvents, setListOfEvents] = useState([]);

console.log(slots)

useEffect(()=>{
  slots.length && setListOfEvents(slots);
},[slots])

  /*
  if (slots !== []) {
    slots.map((item: any) => {
      item.start = new Date(item.dateTime);
      item.end = moment(item.start).add(30, 'm').toDate();
      delete item.dateTime;
    });
    setListOfEvents(slots);
  }

   */
  //console.log(slots);
  /*
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

   */

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setListOfEvents(initialEvents);
    //POST request with data in UFC Format
  };

  const handleSelectSlots = (event: any) => {

    //console.log(event);
    setTime(event.start)
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
        onSelectEvent={handleSelectSlots}
        scrollToTime={new Date()}
        defaultDate={new Date()}
        endAccessor="end"
        style={{ height: 600, width: '100%' }}
      />
    </div>
  );
};

export default CandidateSchedule;
