import React,{Component} from "react";
import logo from "../../assets/img/icon-logo.png"

export default class Nav extends Component{
    constructor(){
        super();
        this.state = {
            usuarioEstaLogado : false
        }
    }
    
    render(){
        return(
            <nav className="Nav container">
                <div className="content flexbox_nav">
                    <div className="logo_box">
                        <img src={logo} alt="Logo do OpFlix" title="Logo do OpFlix"/>
                        <h1>OpFlix</h1>
                    </div>
                    <ul id="lista_nav">
                        <li className="option_nav"> <a>Lançamentos chegando</a> </li>
                        <li className="option_nav"> <a>Lançados recentemente</a> </li>
                        {this.state.usuarioEstaLogado == false?
                            <li className="option_nav"> <a id="login_nav">Login</a> </li>
                        :
                        <li className="option_nav" id="sair_nav"> <a>Sair</a> </li>
                        }
                    </ul>
                </div>
            </nav>
        )
    }
}