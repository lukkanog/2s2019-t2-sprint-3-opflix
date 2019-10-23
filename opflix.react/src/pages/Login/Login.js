import React, { Component } from "react";
import Nav from "../../components/Nav/Nav";
import Rodape from "../../components/Rodape/Rodape";
import {Link} from "react-router-dom";
import jsonwebtoken from "jsonwebtoken";

import "../../assets/css/Login.css";
import Axios from "axios";


export default class Login extends Component {
    constructor() {
        super();
        localStorage.removeItem("usuario-opflix");
        this.state = {
            email: "",
            senha: "",
        }
    }

    atualizarEmail = (event) => {
        event.preventDefault();
        this.setState({ email: event.target.value })
    }

    atualizarSenha = (event) => {
        event.preventDefault();
        this.setState({ senha: event.target.value })
    }

    efetuarLogin = (event) => {
        event.preventDefault();

        let url = "http://localhost:5000/api/login";
        Axios.post(url, {
            email: this.state.email,
            senha: this.state.senha,
        })
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem("usuario-opflix", response.data.token);
                    
                    let token = localStorage.getItem("usuario-opflix");
                    if (jsonwebtoken.decode(token).permissao == "ADMINISTRADOR"){
                        this.props.history.push("/adm/")
                    }else{
                        this.props.history.push("/");
                    }
                    console.log("deu bom")
                }
            })
            .catch(error => console.log(error))
    }


    render() {
        return (
            <div className="Login">
                <header>
                    <Nav />
                </header>
                <main className="container">
                    <div className="content">
                        <h2>Entrar</h2>
                        <form onSubmit={this.efetuarLogin} id="form_login">
                            <label>
                                Email
                                <br />
                                <input onInput={this.atualizarEmail} type="email" placeholder="usuario@email.com" className="input_login" />
                            </label>
                            <label>
                                Senha
                                <br />
                                <input onInput={this.atualizarSenha} type="password" placeholder="*******" className="input_login" />
                            </label>
                            <input type="submit" value="Entrar" id="submit_login" />
                            <p>Ainda não tem uma conta? <Link to="/cadastro" className="link_toblack">Cadastre-se</Link></p>
                        </form>
                    </div>
                </main>
                <Rodape/>
            </div>
        )
    }
}