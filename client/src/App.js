import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import checkAuthToken from './utils/authTokenPresent';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './redux/actions/User Actions';
//-----------------------------------------------------------
import store from './redux/store';
//-----------------------------------------------------------
import NotFound from './React Components/pages/NotFound';
import Home from './React Components/pages/Home';
import Signup from './React Components/pages/Signup';
import Login from './React Components/pages/Login';
import Profile from './React Components/pages/Profile';
import Dashboard from './React Components/pages/Dashboard';
import CreatePost from './React Components/pages/CreatePost';
import SearchResults from './React Components/pages/SearchResults';
import Follow from './React Components/pages/Follow';
import UsageAlarm from './React Components/layouts/UsageAlarm';
import Footer from './React Components/layouts/Footer';
//===================================================================================
const token = checkAuthToken(); //check for existing token.
if (token) store.dispatch(setCurrentUser(token));
//===================================================================================

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/signup' component={Signup} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/profile' component={Profile} />
                        <Route exact path='/dashboard' component={Dashboard} />
                        <Route exact path='/createpost' component={CreatePost} />
                        <Route exact path='/searchresults' component={SearchResults} />
                        <Route exact path='/follow' component={Follow} />
                        <Route component={NotFound} />
                    </Switch>
                    <Footer />
                    <UsageAlarm />
                </Router>
            </Provider>
        );
    }
}
//===================================================================================
export default App;
