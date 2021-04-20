import React, { FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard';
import Staff from './components/staff/staff';
import Authorization from './components/authorization/authorization';
import Navbar from './components/navbar/navbar';
import Error from './components/path_error/error';
import Events from './components/events/events';
import EventForm from './components/events/EventForm/EventForm';
import CandidatesPage from './components/candidates/candidates_page';
import CandidateCard from './components/candidates/candidate_card/candidate_card';
import Axios from 'axios';
import LRU from 'lru-cache';
import { configure } from 'axios-hooks';

const axios = Axios.create({
  baseURL: 'http://localhost:8085/api',
});
const cache = new LRU({ max: 10 });

configure({ axios, cache });

const App: FunctionComponent = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/events" component={Events} />
        <Route path="/event-form/:eventId?" component={EventForm} />
        <Route exact path="/staff" component={Staff} />
        <Route path="/authorization" component={Authorization} />
        <Route exact path="/candidates" component={CandidatesPage} />
        <Route path="/candidates/:id" component={CandidateCard} />
        <Route path="*" component={Error} />
      </Switch>
    </div>
  );
};

export default App;
