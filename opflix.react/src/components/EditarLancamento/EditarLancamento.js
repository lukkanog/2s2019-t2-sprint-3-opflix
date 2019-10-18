import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import Nav from "../Nav/Nav";

export default class EditarLancamento extends Component {
    constructor() {
        super();
        this.state = {
            lancamento: null,

            categorias : [],
            plataformas : [],
            tipos : [],

            idCategoria : "",
            idTipoLancamento : "",
            idPlataforma : "",
            titulo : "",
            duracao : 0,
            sinopse : "",
            dataLancamento : "",
        }
    }

    atualizarEstadoTitulo = (event)=>{
        event.preventDefault();
        this.setState({titulo : event.target.value})
    }

    atualizarEstadoCategoria = (event)=>{
        event.preventDefault();
        this.setState({idCategoria : event.target.value})
    }

    atualizarEstadoPlataforma = (event)=>{
        event.preventDefault();
        this.setState({idPlataforma : event.target.value})
    }

    atualizarEstadoTipo = (event)=>{
        event.preventDefault();
        this.setState({idTipoLancamento : event.target.value})
    }

    atualizarEstadoData = (event) =>{
        event.preventDefault();
        this.setState({dataLancamento : event.target.value})
    }


    atualizarEstadoDuracao = (event) =>{
        event.preventDefault();
        this.setState({duracao : event.target.value});
    }

    atualizarEstadoSinopse = (event)=>{
        event.preventDefault();
        this.setState({sinopse : event.target.value})
    }

    componentDidMount() {
        if (this.props.lancamento === null){
            return(
                <Redirect to={{pathname:"/adm/lancamentos"}}/>
            )
        }


        let token = localStorage.getItem("usuario-opflix");

        fetch("http://localhost:5000/api/lancamentos/" + this.props.idLancamento, {
            authorization: "Bearer " + token,
        })
            .then(response => response.json())
            .then(lancamentoAchado => this.setState({ lancamento: lancamentoAchado }))
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="EditarLancamento">
                <header>
                    <Nav />
                </header>
                <main className="container">
                    <div className="content">
                        <h2>Editar</h2>
                        <form id="form_lancamento" onSubmit={this.cadastrarLancamento}>

                            <label className="grupo_input">
                                Título
                                <br />
                                <input onInput={this.atualizarEstadoTitulo} value={this.props.lancamento.titulo} className="" type="text" minLength="1" maxLength="100" required className="input_lancamento" />
                            </label>

                            <label className="grupo_input">
                                Data de lançamento
                                <br />
                                <input type="date" onChange={this.atualizarEstadoData} required className="input_lancamento" />
                            </label>

                            <label className="grupo_input">
                                Tipo
                                <br />
                                <select onChange={this.atualizarEstadoTipo} required className="input_lancamento select_lancamento">
                                    <option disabled selected>Selecione</option>
                                    {this.state.tipos.map(element => {
                                        return (
                                            <option value={element.idTipoLancamento} key={element.idTipoLancamento}>{element.nome}</option>
                                        )
                                    })}
                                </select>
                            </label>

                            <label className="grupo_input">
                                Gênero
                                <br />
                                <select onChange={this.atualizarEstadoCategoria} required className="input_lancamento select_lancamento">
                                    <option disabled selected>Selecione</option>
                                    {this.state.categorias.map(element => {
                                        return (
                                            <option key={element.idCategoria} value={element.idCategoria}>{element.nome}</option>
                                        )
                                    })}
                                </select>
                            </label>

                            <label className="grupo_input">
                                Plataforma
                                <br />
                                <select onChange={this.atualizarEstadoPlataforma} required className="input_lancamento select_lancamento">
                                    <option disabled selected>Selecione</option>
                                    {this.state.plataformas.map(element => {
                                        return (
                                            <option key={element.idPlataforma} value={element.idPlataforma}>{element.nome}</option>
                                        )
                                    })}
                                </select>
                            </label>

                            <label className="grupo_input">
                                Duração (em minutos)
                                <br />
                                <input onChange={this.atualizarEstadoDuracao} value={this.props.lancamento.duracao} type="number" min="1" max="1000" required className="input_lancamento" />
                            </label>

                            <label className="grupo_input">
                                Sinopse
                                <br />
                                <textarea onInput={this.atualizarEstadoSinopse} value={this.props.lancamento.sinopse} minLength="10" maxLength="800" id="textArea_sinopse" required className="input_lancamento" placeholder="Escreva aqui a sinopse" />
                            </label>

                            <input type="submit" value="Cadastrar lançamento" id="btn_submit_lancamento" />

                        </form>
                    </div>
                </main>
            </div>
        )
    }
}