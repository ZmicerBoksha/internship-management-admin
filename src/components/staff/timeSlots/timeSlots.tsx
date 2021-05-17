import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid } from "@material-ui/core";


import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Button from "@material-ui/core/Button";
import CandidateMiniCard from "../canditadeMiniCard/candidateMiniCard";
import { useHistory } from "react-router-dom";

const localizer = momentLocalizer(moment);


const TimeSlots = () => {

  let JSON = [
    {
      id: 1,
      title: "Long Event",
      start: new Date(2021, 5, 7),
      isConnected: true
    },

    {
      id: 2,
      title: "DTS STARTS",
      start: new Date(2021, 2, 15, 0, 0, 0)
    },

    {
      id: 5,
      title: "DTS ENDS",
      start: new Date(2021, 10, 6, 0, 0, 0)
    },

    {
      id: 4,
      title: "Some Event",
      start: new Date(2021, 5, 9, 0, 0, 0)
    },
    {
      id: 6,
      title: "Meeting",
      start: new Date(2021, 5, 12, 10, 50, 0, 0),
      desc: "Pre-meeting meeting, to prepare for the meeting"
    },
    {
      id: 7,
      title: "Lunch",
      start: new Date(2021, 5, 6, 6, 0, 0, 0),
      desc: "Power lunch"
    },
    {
      id: 8,
      title: "Meeting",
      start: new Date(2021, 5, 6, 6, 30, 0, 0)
    },
    {
      id: 9,
      title: "Happy Hour",
      start: new Date(2021, 5, 6, 7, 0, 0, 0),
      desc: "Most important meal of the day"
    },
    {
      id: 10,
      title: "Dinner",
      start: new Date(2021, 5, 6, 7, 30, 0, 0)
    },
    {
      id: 11,
      title: "Planning Meeting with Paige",
      start: new Date(2021, 5, 15, 8, 0, 0)
    },
    {
      id: 11.1,
      title: "Inconvenient Conference Call",
      start: new Date(2021, 5, 15, 9, 50, 0)
    },
    {
      id: 11.2,
      title: "Project Kickoff - Lou's Shoes",
      start: new Date(2021, 5, 15, 11, 50, 0)
    },
    {
      id: 11.5,
      title: "Quote Follow-up - Tea by Tina",
      start: new Date(2021, 5, 15, 15, 50, 0)
    },
    {
      id: 12,
      title: "Late Night Event",
      start: new Date(2021, 5, 17, 19, 50, 0)
    },
    {
      id: 16,
      title: "Video Record",
      start: new Date(2021, 5, 14, 15, 50, 0),
      end: new Date(2021, 5, 14, 19, 0, 0)
    },
    {
      id: 17,
      title: "Dutch Song Producing",
      start: new Date(2021, 5, 14, 16, 50, 0)
    },
    {
      id: 18,
      title: "Itaewon Halloween Meeting",
      start: new Date(2021, 5, 14, 16, 50, 0)
    },
    {
      id: 19,
      title: "Online Coding Test",
      start: new Date(2021, 5, 14, 17, 50, 0)
    },
    {
      id: 20,
      title: "An overlapped Event",
      start: new Date(2021, 5, 14, 17, 0, 0)
    },
    {
      id: 21,
      title: "Phone Interview",
      start: new Date(2021, 5, 14, 17, 0, 0)
    },
    {
      id: 22,
      title: "Cooking Class",
      start: new Date(2021, 5, 14, 17, 50, 0)
    },
    {
      id: 25,
      title: "Go to the gym",
      start: new Date(2021, 5, 14, 18, 50, 0)
    }
  ];

  let arr = [
    {
      start: new Date(2021, 5, 14, 18, 0, 0),
      title: "Some title"
    }
  ];


  JSON.map((item: any) => {
    item["end"] = moment(item.start).add(30, "m").toDate();
  });
  const [open, setOpen] = useState<boolean>(false);

  const openPopUp = (event: any) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const history = useHistory();
  const handleRedirectToCandidate=()=>{

    history.push(`/candidate/${2}`);
  };

  const [events, setEvents] = useState(JSON);

  const handleSelect = (e: any): void => {
    const title = window.prompt("New Event name");
    if (title) {
      e.slots.forEach((slot: Date, index: number) => {
        let event = {
          id: index,
          start: slot,
          end: moment(slot).add(30, "m").toDate(),
          title: title,
          meta: ""
        };

        setEvents(prevState => [...prevState, event]);
      });
    }
  };

  const candidate = {
    cnId: 2,
    firstName: "Anton",
    lastName: "Vasilev",
    primaryTechnology: "Java",
    interviewDate: "Thu May 13 2021 12:40:38 GMT+0300 (Москва, стандартное время)"
  };


  return (
    <Grid xs={12} className="App" style={{ marginTop: "60px" }}>
      <Calendar
        selectable={true}
        localizer={localizer}
        views={["week"]}
        defaultView={"week"}
        events={events}
        startAccessor="start"
        scrollToTime={new Date(2018, 1, 1, 6)}
        defaultDate={new Date()}
        onSelectEvent={event => openPopUp(event)}
        onSelectSlot={e => handleSelect(e)}
        style={{ height: "940" }}
        endAccessor="end"
        eventPropGetter={
          (event, start, end, isSelected) => {
            let newStyle = {
              backgroundColor: "lightgrey",
              color: "black",
              border: "none"
            };

            if (event.isConnected) {
              newStyle.backgroundColor = "lightgreen";
            }

            return {
              className: "",
              style: newStyle
            };
          }
        }
      />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle>Information about time slot</DialogTitle>
        <DialogContent>
          <CandidateMiniCard timeZon={"Europe/Kirov"} candidate={candidate} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRedirectToCandidate} color="primary">
            View details about candidate
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default TimeSlots;
