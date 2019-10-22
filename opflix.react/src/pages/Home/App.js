import React, { Component } from 'react';
import logo from "../../assets/img/icon-logo.png";
import Nav from "../../components/Nav/Nav";
import "../../assets/css/App.css";


import jsonwebtoken from "jsonwebtoken";
import { Link } from "react-router-dom";
import Axios from 'axios';
import jureg from "../../assets/img/jureg-teste.png";
import estrelinha from "../../assets/img/estrela.png"
import Moment from 'react-moment';

class App extends Component {
  constructor() {
    super();
    this.state = {
      lancamentos: [],
      favoritos : [],
    }
  }

  componentDidMount() {
    let url = "http://localhost:5000/api/lancamentos";

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

    
    let urlFavoritos = "http://localhost:5000/api/favoritos";
    let token = localStorage.getItem("usuario-opflix")

    if (token != null){
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
    .then(window.location.reload())
    .catch(error => console.log(error))
  }

  desfavoritar = (id) => {
    let token = localStorage.getItem("usuario-opflix");

    fetch("http://localhost:5000/api/favoritos/" + id, {
      method: "DELETE",
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
      <div className="App">

        <header className="container">
          <Nav />

        </header>


        {/* Banner */}
        <section className="container banner">
          <div className="content">
            <div className="logo_box">
              <img src={logo} alt="Logo do OpFlix" />
              <h2>OpFlix</h2>
            </div>

            <div id="textgroup_banner">
              <p id="texto_banner">Os principais lançamentos do mundo cinematográfico na sua mão!</p>
              <a id="link_banner">Comece agora</a>
            </div>

          </div>
        </section>

        <main>
          <section className="conteudo_lancamentos container">
            <div className="content" id="conteudo">
              <h3>Lançamentos</h3>

              {this.state.lancamentos.slice(0, 3).map(element => {
                return (
                  <div key={element.idLancamento} className="box_lancamento">
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
                )
              })}
            </div>
          </section>

        </main>

      </div>
    );
  }
}

export default App;
