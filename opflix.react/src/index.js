import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/Home/App';
import * as serviceWorker from './serviceWorker';
import jsonwebtoken from "jsonwebtoken";

// import { parseJwt } from "../../services/auth"

import {Route, Link, BrowserRouter as Router, Switch, Redirect} from "react-router-dom";
import NaoEncontrado from './pages/NaoEncontrado/NaoEncontrado';
import Login from "./pages/Login/Login";
import Categorias from './pages/Categorias/Categorias';
import LancamentosComum from "./pages/Lancamentos/LancamentosComum";
import LancamentosAdm from "./pages/Lancamentos/LancamentosAdm";
import CadastrarLancamento from "./pages/Lancamentos/CadastrarLancamento";
import EditarLancamento from "./components/EditarLancamento/EditarLancamento";





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

const RotaPrivadaAdm = ({component : Component}) =>(
    <Route 
    render={
        props =>
        localStorage.getItem("usuario-opflix") !== null ? (
            jsonwebtoken.decode(localStorage.getItem("usuario-opflix")).permissao === "ADMINISTRADOR" ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{pathname : "/erro", state: {from : props.location}}}/>
            )
        ) : (
            <Redirect to={{pathname : "/login", state: {from : props.location}}}/>
        )
    }
    />
);

const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/login" component={Login}/>
                <RotaPrivada exact path="/lancamentos" component={LancamentosComum}/>
                <RotaPrivadaAdm path="/adm/categorias" component={Categorias}/>
                <RotaPrivadaAdm path="/adm/lancamentos/cadastrar" component={CadastrarLancamento}/>
                <RotaPrivadaAdm path="/adm/lancamentos/editar" component={EditarLancamento}/>
                <RotaPrivadaAdm path="/adm/plataformas"/>
                <RotaPrivadaAdm path="/adm/lancamentos" component={LancamentosAdm}/>

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
