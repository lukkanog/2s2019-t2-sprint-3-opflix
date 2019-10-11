import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/Home/App';
import * as serviceWorker from './serviceWorker';


import {Route, Link, BrowserRouter as Router, Switch, Redirect} from "react-router-dom";
import NaoEncontrado from './pages/NaoEncontrado/NaoEncontrado';
import Login from "./pages/Login/Login";
import Categorias from './pages/Categorias/Categorias';
import Lancamentos from "./pages/Lancamentos/Lancamentos";

const RotaPrivada = ({component : Component}) =>(
    <Route
        render={props =>
        localStorage.getItem("usuario-opflix") !== null ? (
            <Component {...props}/> 
        ) : (
                <Redirect 
                to={{pathname : "/login", state: {from : props.location}}}
                />
            )
        }
    />    
);

// const RotaPrivadaAdm = ({component : Component}) =>(
//     <Route
//         render={props =>
//             localStorage.getItem("usuario-opflix") !== null  ? (
//             <Component {...props}/> 
//         ) : (
//                 <Redirect 
//                 to={{pathname : "/login", state: {from : props.location}}}
//                 />
//             )
//         }
//     />    
// );

const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/login" component={Login}/>
                <RotaPrivada path="/categorias" component={Categorias}/>
                <RotaPrivada path="/lancamentos" component={Lancamentos}/>
                <RotaPrivada path="/plataformas"/>
                    {/* DEIXA ESSE POR ULTIMO */}
                <Route component={NaoEncontrado}/>
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
