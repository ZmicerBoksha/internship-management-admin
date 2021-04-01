import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './components/dashboard/dashboard';
import Events from './components/events/events';
import Staff from './components/staff/staff';
import Authorization from './components/authorization/authorization';
import Navbar from './components/navbar/navbar';
import Error from './components/path_error/error';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route exact path='/events' component={Events} />
                <Route exact path='/staff' component={Staff} />
                <Route path='/authorization' component={Authorization} />
                <Route path='*' component={Error} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
