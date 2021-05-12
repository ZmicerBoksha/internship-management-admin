import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../dashboard/dashboard';
import Events from '../events/events';
import Authorization from '../authorization/authorization';
import CandidatesPage from '../candidates/candidates_page';
import CandidateCard from '../candidates/candidate_card/candidate_card';
import Error from '../path_error/error';

import TsTable from '../staff/tsTable/tsTable';
import HrTable from '../staff/hrTable/hrTable';
import StaffPage from '../staff/staffPage/staffPage';
import EventInfo from '../events/eventInfo/eventInfo';


const Routers: React.FC = () => {
  return (
    <div className="wrapper">
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path='/events' component={Events} />
        <Route exact path='/events/:eventType?/:eventId?' component={EventInfo} />
        <Route exact path="/staff/hr" component={HrTable} />
        <Route exact path="/staff/ts" component={TsTable} />
        <Route exact path="/staff/hr/:id" component={StaffPage} />
        <Route exact path="/staff/:add?" component={StaffPage} />

        <Route exact path="/candidate" component={CandidatesPage} />
        <Route path="/candidate/:id" component={CandidateCard} />
        <Route path="*" component={Error} />
      </Switch>
    </div>
  );
};

export default Routers;
