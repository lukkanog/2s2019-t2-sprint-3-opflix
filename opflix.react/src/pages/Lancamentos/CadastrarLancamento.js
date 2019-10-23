import React,{Component} from "react";
import Nav from "../../components/Nav/Nav";
import "../../assets/css/CadastrarLancamento.css";
import Axios from "axios";
import {Redirect,} from "react-router-dom";
import Rodape from "../../components/Rodape/Rodape";


class CadastrarLancamento extends Component{
    constructor(){
        super();
        this.state = {
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
            jaFoiCadastrado : false,
        }
    }
    

    componentDidMount(){
        let urlCategorias = "http://localhost:5000/api/categorias";
        let urlTipos = "http://localhost:5000/api/tiposlancamento";
        let urlPlataformas = "http://localhost:5000/api/plataformas";
        
        let token = localStorage.getItem("usuario-opflix");

        fetch(urlTipos,{
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        .then(response => response.json())
        .then(data => this.setState({tipos : data}))
        .catch(error => console.log(error))

        fetch(urlCategorias,{
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        .then(response => response.json())
        .then(data => this.setState({categorias : data}))
        .catch(error => console.log(error))

        fetch(urlPlataformas,{
            headers: {
                "Authorization": "Bearer " + token
            }
        })
        .then(response => response.json())
        .then(data => this.setState({plataformas : data}))
        .catch(error => console.log(error))
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

    cadastrarLancamento = (event) =>{
        event.preventDefault();
        console.log(this.state)

        let token = localStorage.getItem("usuario-opflix");


        Axios.post("http://localhost:5000/api/lancamentos",{
            idCategoria : this.state.idCategoria,
            idPlataforma : this.state.idPlataforma,
            idTipoLancamento : this.state.idTipoLancamento,
            titulo : this.state.titulo,
            sinopse : this.state.sinopse,
            duracao : this.state.duracao,
            dataLancamento : this.state.dataLancamento,
        },{headers:{
            Authorization: "Bearer " + token
        }})
        .then(response => console.log(response.status))
        .then(this.setState({jaFoiCadastrado : true}))
        .catch(error => console.log(error))

    }


    render(){
        if (this.state.jaFoiCadastrado === true){
            return(
                <Redirect to={{pathname:"/adm/lancamentos"}}/>
            )
        }else
        {
            return(
                <div className="CadastrarLancamento">
                <header>
                    <Nav/>
                </header>
                <main className="container">
                    <div className="content">
                        <h2>Novo lançamento</h2>
                        <form id="form_lancamento" onSubmit={this.cadastrarLancamento}>

                            <label className="grupo_input">
                                Título
                                <br/>
                                <input onInput={this.atualizarEstadoTitulo} className="" type="text" minLength="1" maxLength="100" required className="input_lancamento"/>
                            </label>

                            <label className="grupo_input">
                                Data de lançamento
                                <br/>
                                <input type="date" onChange={this.atualizarEstadoData} required className="input_lancamento"/>
                            </label>

                            <label className="grupo_input">
                                Tipo
                                <br/>
                                <select onChange={this.atualizarEstadoTipo} required className="input_lancamento select_lancamento">
                                    <option disabled selected>Selecione</option>
                                    {this.state.tipos.map(element =>{
                                        return(
                                            <option value={element.idTipoLancamento} key={element.idTipoLancamento}>{element.nome}</option>
                                            )
                                        })}
                                </select>
                            </label>

                            <label className="grupo_input">
                                Gênero
                                <br/>
                                <select onChange={this.atualizarEstadoCategoria} required className="input_lancamento select_lancamento">
                                    <option disabled selected>Selecione</option>
                                    {this.state.categorias.map(element =>{
                                        return(
                                            <option key={element.idCategoria} value={element.idCategoria}>{element.nome}</option>
                                        )
                                    })}
                                </select>
                            </label>

                            <label className="grupo_input">
                                Plataforma
                                <br/>
                                <select onChange={this.atualizarEstadoPlataforma} required className="input_lancamento select_lancamento">
                                    <option disabled selected>Selecione</option>
                                    {this.state.plataformas.map(element =>{
                                        return(
                                            <option key={element.idPlataforma} value={element.idPlataforma}>{element.nome}</option>
                                            )
                                        })}
                                </select>
                            </label>

                            <label className="grupo_input">
                                Duração (em minutos)
                                <br/>
                                <input onChange={this.atualizarEstadoDuracao} type="number" min="1" max="1000" required className="input_lancamento"/>
                            </label>

                            <label className="grupo_input">
                                Sinopse
                                <br/>
                                <textarea onInput={this.atualizarEstadoSinopse} minLength="10" maxLength="800" id="textArea_sinopse" required className="input_lancamento" placeholder="Escreva aqui a sinopse"/>
                            </label>

                            <input type="submit" value="Cadastrar lançamento" id="btn_submit_lancamento"/>
                            
                        </form>
                    </div>
                </main>
                <Rodape />
            </div>
            )
        }
    }
}
    export default CadastrarLancamento;