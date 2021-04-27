import { FunctionComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard';
import Staff from './components/staff/staff';
import Authorization from './components/authorization/authorization';
import Navbar from './components/navbar/navbar';
import Error from './components/path_error/error';
import Events from './components/events/events';
import EventInfo from './components/events/eventInfo/eventInfo';

const App: FunctionComponent = () => {
    return (
        <div>
            <Navbar />
            <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route   
                    exact
                    path='/events' 
                    component={Events}
                />
                <Route   
                    exact
                    path='/events/:eventType?/:eventId?'
                    component={EventInfo}
                />
                <Route exact path='/staff' component={Staff} />
                <Route path='/authorization' component={Authorization} />
                <Route path='*' component={Error} />
            </Switch>
        </div>    
    );
}

export default App;
