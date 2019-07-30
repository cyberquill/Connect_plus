import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import checkAuthToken from './utils/authTokenPresent';
import { setCurrentUser } from './redux/actions/User Actions';
//-----------------------------------------------------------
import store from './redux/store';
//-----------------------------------------------------------
import NotFound from './React Components/pages/NotFound';
import Home from './React Components/pages/Home';
import Signup from './React Components/pages/Signup';
import Login from './React Components/pages/Login';
//===================================================================================
const token = checkAuthToken();                         //check for existing token.
if (token) store.dispatch(setCurrentUser(token));
//===================================================================================

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/login" component={Login} />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}
//===================================================================================
export default App;
