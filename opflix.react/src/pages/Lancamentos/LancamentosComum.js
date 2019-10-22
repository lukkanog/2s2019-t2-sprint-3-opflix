import React, { Component } from "react";
import Axios from "axios";

import estrelinha from "../../assets/img/estrela.png";
import jureg from "../../assets/img/jureg-teste.png"

import "../../assets/css/Lancamentos.css";


import Nav from "../../components/Nav/Nav";

export default class Lancamentos extends Component {
    constructor() {
        super();
        this.state = {
            lancamentos: [],
            quantExibida: 5,

            favoritos: [],
            // filtroPlataforma : "",
            // filtroData : "",
        }
    }

    atualizarPagina = () =>{
        const url = "http://localhost:5000/api/lancamentos";

        Axios.get(url)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ lancamentos: response.data });
                    console.log(this.state)
                } else {
                    console.log("ipa deu ruim" + response.status)
                }
            })
            .catch(error => console.log(error))
    }


    componentDidMount() {
        this.atualizarPagina();
        
        
        const urlFavoritos = "http://localhost:5000/api/favoritos";
        let token = localStorage.getItem("usuario-opflix");


        Axios.get(urlFavoritos, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
            .then(response => {
                if (response.status === 200) {
                    this.setState({ favoritos: response.data });
                    console.log(this.state)
                } else {
                    console.log("ipa deu ruim nos favorito" + response.status)
                }
            })
            .catch(error => console.log(error))
    }


    exibirMaisTres = (event) => {
        event.preventDefault();
        this.setState({ quantExibida: this.state.quantExibida + 3 })
    }

    foiFavoritado = (id) => {
        let bool = false;
        this.state.favoritos.map(element => {
            if (element.idLancamento == id) {
                bool = true;
                return bool;
            }
        })
        return bool;
    }

    favoritar = (id) => {
        console.log(id);
        let token = localStorage.getItem("usuario-opflix");

        fetch("http://localhost:5000/api/favoritos", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + token,
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                idLancamento: id
            })
        })
        // .then(this.adicionarNaListaFavoritos(id))
        // .then(this.atualizarPagina())
        .then(window.location.reload())
        .catch(error => console.log(error))
    }

    adicionarNaListaFavoritos = (id) =>{
        let lancamento = this.state.lancamentos.filter(element =>{
            return element.idLancamento == id
        })
        let listaFavoritos = this.state.favoritos;
        listaFavoritos.push(lancamento);
        this.setState({favoritos : listaFavoritos})
        console.log(this.state)
    }

    desfavoritar = (id) =>{
        let token = localStorage.getItem("usuario-opflix");

        fetch("http://localhost:5000/api/favoritos/" + id,{
            method : "DELETE",
            headers: {
                "Authorization": "Bearer " + token,
            }
        })
        .then(window.location.reload())
        .catch(error => console.log(error))
    }

    formatarData = (element) => {
        let data = element.dataLancamento.split("T")[0];
        let ano = data.split("-")[0];
        let mes = data.split("-")[1];
        let dia = data.split("-")[2];

        return (dia + "/" + mes + "/" + ano);
    }

    render() {
        return (
            <div className="Lancamentos">
                <header>
                    <Nav />
                </header>
                <main className="container">
                    <div className="content">
                        <h2>Todos os lançamentos</h2>

                        {this.state.lancamentos.slice(0, this.state.quantExibida).map(element => {
                            return (
                                <div className="box_lancamento" key={element.idLancamento}>
                                    <div className="textos_e_capa">
                                        <div>
                                            <h4 className="titulo_lancamento">{element.titulo}</h4>
                                            <p className="caracteristicas_lancamento"><b>Tipo: </b>{element.idTipoLancamentoNavigation.nome}</p>
                                            <p className="caracteristicas_lancamento"><b>Gênero: </b>{element.idCategoriaNavigation.nome}</p>
                                            <p className="caracteristicas_lancamento"><b>Plataforma: </b>{element.idPlataformaNavigation.nome}</p>
                                            {element.idTipoLancamentoNavigation.nome == "Serie" ?
                                                <p className="caracteristicas_lancamento"><b>Duração: </b>{element.duracao + " minutos por episódio"}</p>
                                                :
                                                <p className="caracteristicas_lancamento"><b>Duração: </b>{element.duracao + " minutos"}</p>
                                            }

                                            <p className="caracteristicas_lancamento sinopse" ><b>Sinopse: </b>{element.sinopse}</p>
                                        </div>
                                        <div>
                                            <img src={jureg} className="capa_lancamento" alt="capa do lançamento" />
                                        </div>
                                    </div>

                                    <div className="data_e_btn">
                                        <p className="data_lancamento">{this.formatarData(element)}</p>

                                        {this.foiFavoritado(element.idLancamento) !== true ?
                                            <button className="btn_favoritar" id={"favoritar_" + element.idLancamento} onClick={() => this.favoritar(element.idLancamento)}>
                                                <img src={estrelinha} className="estrelinha_btn_favoritar" />
                                                <p className="texto_btn_favoritar">Adicionar aos favoritos</p>
                                            </button>
                                            :
                                            <button className="btn_desfavoritar" onClick={() => this.desfavoritar(element.idLancamento)}>
                                                <img src={estrelinha} className="estrelinha_btn_favoritar" />
                                                <p className="texto_btn_favoritar">Desfavoritar</p>
                                            </button>
                                        }
                                    </div>
                                </div>
                            )//return foreach
                        })}
                        {this.state.quantExibida < this.state.lancamentos.length ?
                            <button onClick={this.exibirMaisTres} id="btn_ver_mais">Ver mais</button>
                            :
                            <span/>
                        }
                    </div>
                </main>
            </div>
        )//return
    }//render
}