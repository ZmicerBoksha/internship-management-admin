import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CandidateSchedule = () => {
  let arr = [
    {
      start: moment().toDate(),
      end: moment().add(1, 'days').toDate(),
      title: 'Some title',
    },
  ];
  const [events, setEvents] = useState(arr);

  const handleSelect = ({ start, end }: any) => {
    const title = window.prompt('New Event name');
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };

  return (
    <div className="App">
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        scrollToTime={new Date(1970, 1, 1, 6)}
        defaultDate={new Date(2015, 3, 12)}
        onSelectEvent={event => alert(event.title)}
        onSelectSlot={handleSelect}
        style={{ height: '100vh' }}
      />
    </div>
  );
};

export default CandidateSchedule;
