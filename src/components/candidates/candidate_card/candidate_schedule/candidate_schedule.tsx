import React, { useState, FunctionComponent } from 'react';
import Axios from 'axios';
import LRU from 'lru-cache';
import { configure } from 'axios-hooks';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/sass/styles.scss';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss';

const axios = Axios.create({
  baseURL: 'http://localhost:8085/api',
});
const cache = new LRU({ max: 10 });

configure({ axios, cache });

const localizer = momentLocalizer(moment)

/*1 студент выбирает доступное время
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

const CandidateSchedule: React.FC = () => {
  type Event = {
    start: string;
    end: string;
    title: string;
    meta: string;
  };
  const initialEvents: Event[] = []

  const [listOfEvents, setListOfEvents] = useState(initialEvents);
  const handleSelect  = (e: any): void => {
    const title = window.prompt('New Event name')
    console.log(e.slots);//используем слоты а не ренджи

    if (title){
      setListOfEvents([...listOfEvents, {start: e.start, end: e.end, title: title, meta: 'some meta'}])
    }
  }

  console.log(listOfEvents)

  return (
    <div style={{backgroundColor: 'white'}}>
      <Calendar
        selectable={true}
        views={['week']}
        defaultView={'week'}
        onNavigate={e=>console.log('надо сохранить если мы переключаем неделю')}
        localizer={localizer}
        events={listOfEvents}
        startAccessor="start"
        onSelectEvent={(event => console.log(event))}
        onSelectSlot={e => handleSelect(e)}
        endAccessor="end"
        style={{ height: 940 }}
      />
    </div>
  )
}

export default CandidateSchedule;
