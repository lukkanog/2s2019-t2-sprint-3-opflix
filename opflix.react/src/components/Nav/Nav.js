import React,{Component} from "react";
import logo from "../../assets/img/icon-logo.png";
import {Link} from "react-router-dom";
import jsonwebtoken from "jsonwebtoken";


export default class Nav extends Component{
    constructor(){
        super();
        this.state = {
            usuarioEstaLogado : false,
            permissao : "",
        }
    }

    componentDidMount(){
        let user = localStorage.getItem("usuario-opflix");
        if (user != null){
            this.setState({usuarioEstaLogado : true})
        }else{
            var jwt = require("jsonwebtoken");
            var token = localStorage.getItem("usuario-opflix");
            let decoded = jwt.decode(token);
        }
    }


    efetuarLogout = (event) =>{
        event.preventDefault();
        localStorage.removeItem("usuario-opflix");
        this.setState({usuarioEstaLogado : false})
    }
    
    render(){
        return(
            <nav className="Nav container">
                <div className="content flexbox_nav">
                    <Link to="/" id="link_home">
                        <div className="logo_box">
                            <img src={logo} alt="Logo do OpFlix" title="Logo do OpFlix"/>
                            <h1>OpFlix</h1>
                        </div>
                    </Link>
                    <ul id="lista_nav">
                        <li className="option_nav"> <Link to="/lancamentos">Todos os lançamentos</Link> </li>
                        <li className="option_nav"> <Link to ="/">Procurar</Link> </li>
                        {this.state.usuarioEstaLogado == false?
                            <li className="option_nav"> <Link to="/login" id="login_nav">Login</Link> </li>
                        :
                            <li className="option_nav" > <a onClick={this.efetuarLogout} id="sair_nav">Sair</a> </li>
                        }
                    </ul>
                </div>
            </nav>
        )
    }
}