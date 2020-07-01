import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Config from './Config';
import {map} from 'lodash';
const Routing = (props) => {
    const {setCheckLogin} = props;
    return (
        <Router>
            <Switch>
                {map(Config, (route, index) =>(
                    <Route key={index} path={route.path} exact={route.exact} >
                        <route.page setCheckLogin={setCheckLogin} />
                    </Route>
                ))}
            </Switch>
        </Router>
    )
}
export default Routing;