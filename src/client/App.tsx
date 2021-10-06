import React from 'react';
import WelcomeScreen from './components/pages/WelcomeScreen';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import './App.css';

const App = () => {
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={WelcomeScreen} />
            </Switch>
        </Router>
    )
};

export default App;