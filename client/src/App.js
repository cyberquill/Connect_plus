
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
//-----------------------------------------------------------
import store from './redux/store';
//-----------------------------------------------------------
import Footer from './components/layout/Footer';

import Home     from './components/routes/Home';
import SignUp   from './components/routes/SignUp';
import Login    from './components/routes/Login';
import NotFound from './components/routes/NotFound';
//===================================================================================

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/signup" component={SignUp} />
                        <Route exact path="/login" component={Login} />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
                <Footer />
            </Provider>
        );
    }
}

export default App;
