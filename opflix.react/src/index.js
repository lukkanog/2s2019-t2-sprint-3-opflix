import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/Home/App';
import * as serviceWorker from './serviceWorker';


import {Route, Link, BrowserRouter as Router, Switch, Redirect} from "react-router-dom";
import NaoEncontrado from './pages/NaoEncontrado/NaoEncontrado';
import Login from "./pages/Login/Login";

const Routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route component={NaoEncontrado}/>
                <Route path="/login" component={Login}/>
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
