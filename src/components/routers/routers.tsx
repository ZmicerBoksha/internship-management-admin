import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../dashboard/dashboard';
import Events from '../events/events';
import EventForm from '../events/EventForm/EventForm';
import Staff from '../staff/staff';
import Authorization from '../authorization/authorization';
import CandidatesPage from '../candidates/candidates_page';
import CandidateCard from '../candidates/candidate_card/candidate_card';
import Error from '../path_error/error';

const Routers: React.FC = () => {
  return (
    <div className="wrapper">
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/events" component={Events} />
        <Route path="/event-form/:eventId?" component={EventForm} />
        <Route exact path="/staff" component={Staff} />
        <Route path="/authorization" component={Authorization} />
        <Route exact path="/candidate" component={CandidatesPage} />
        <Route path="/candidate/:id" component={CandidateCard} />
        <Route path="*" component={Error} />
      </Switch>
    </div>
  );
};

export default Routers;
