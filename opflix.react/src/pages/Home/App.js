import React,{Component} from 'react';
import logo from "../../assets/img/icon-logo.png";
import Nav from "../../components/Nav/Nav";

import "../../assets/css/App.css";



import {Link} from "react-router-dom";
import Axios from 'axios';
import jureg from "../../assets/img/jureg-teste.png";
import estrelinha from "../../assets/img/estrela.png"
import Moment from 'react-moment';

class App extends Component {
  constructor(){
    super();
    this.state = {
      lancamentos : [],
    }
  }

  componentDidMount(){
    let url = "http://localhost:5000/api/lancamentos";
    
    Axios.get(url)
    .then(response =>{
      if (response.status === 200 ){
        this.setState({lancamentos : response.data});
        console.log(this.state)
      }else{
        console.log("ipa deu ruim" + response.status)
      }
    })
    .catch(error => console.log(error))


  }
  
  render(){
    return (
      <div className="App">
        
        <header className="container">
          <Nav />
        
        </header>
        

          {/* Banner */}
          <section className="container banner">
            <div className="content">
              <div className="logo_box">
                <img src={logo} alt="Logo do OpFlix"/>
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

              {this.state.lancamentos.slice(0,3).map(element =>{

                let data = element.dataLancamento.split("T")[0];
                let ano = data.split("-")[0];
                let mes = data.split("-")[1];
                let dia = data.split("-")[2];

                element.dataLancamento = dia + "/" + mes + "/" + ano;
                

                  return(
                    <div className="box_lancamento">
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
                        <img src={jureg} className="capa_lancamento" alt="capa do lançamento"/>   
                      </div>
                    </div>

                    <div className="data_e_btn">
                      <p className="data_lancamento">{element.dataLancamento}</p>
                    <button className="btn_favoritar">
                      <img src={estrelinha} className="estrelinha_btn_favoritar"/>
                      <p className="texto_btn_favoritar">Adicionar aos favoritos</p>
                    </button>
                  
                  
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
