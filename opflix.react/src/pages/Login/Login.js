import React,{Component} from "react";
import Nav from "../../components/Nav/Nav";

import "../../assets/css/Login.css";
import Axios from "axios";


export default class Login extends Component{
    constructor(){
        super();
        this.state = {
            email : "",
            senha : "",
        }
    }
    
    atualizarEmail = (event) =>{
        event.preventDefault();
        this.setState({email : event.target.value})
    }

    atualizarSenha = (event) =>{
        event.preventDefault();
        this.setState({senha : event.target.value})
    }

    efetuarLogin = (event)=>{
        event.preventDefault();

        let url = "http://localhost:5000/api/login";
        Axios.post(url,{
            email: this.state.email,
            senha : this.state.senha,
        })
        .then(response => {
            if (response.status === 200)
            {
                console.log("deu bom")
            }
        })
        .catch(error => console.log(error))
    }




    render(){
        return(
            <div className="Login">
                <Nav/>
                <main className="container">
                    <div className="content">
                <h2>Entrar</h2> 
                <form onSubmit={this.efetuarLogin}>
                    <label>
                        Email
                        <input onInput={this.atualizarEmail} type="email" placeholder="usuario@email.com"/>
                    </label>
                    <label>
                        Senha
                        <input onInput={this.atualizarSenha} type="password" placeholder="*******"/>
                    </label>
                    <input type="submit" value="Entrar"/>
                </form>
                    </div>

                </main>
            </div>
        )   
    }
}