import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import Dashboard from './components/dashboard/dashboard';
import Events from './components/events/events';
import HrTable from './components/hrTable/hrTable';
import Authorization from './components/authorization/authorization';
import Navbar from './components/navbar/navbar';
import Error from './components/path_error/error';
import StaffPage from "./components/staffPage/staffPage";


const App: React.FC = () => {

    return (
        <BrowserRouter >
            <Navbar/>
            <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route exact path='/events' component={Events} />
                <Route exact path='/hrs' component={HrTable} />
                <Route exact path='/ts' component={HrTable} />
                <Route exact path="/hr/:id" component={StaffPage}/>
                <Route exact path="/staff/:add?" component={StaffPage}/>
                <Route path='/authorization' component={Authorization} />
                <Route path='*' component={Error} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
