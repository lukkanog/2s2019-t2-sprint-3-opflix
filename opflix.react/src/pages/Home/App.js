import React,{Component} from 'react';
import logo from "../../assets/img/icon-logo.png";
import Nav from "../../components/Nav/Nav";

import "../../assets/css/App.css";

class App extends Component {
  constructor(){
    super();
  }
  
  render(){
    return (
      <div className="App">
        
        <header className="container">
          <Nav />
        
        </header>
        
        <main>

          {/* Banner */}
          <section className="container banner">
            <div className="content">
              <div className="logo_box">
                <img src={logo} alt="Logo do OpFlix" title="Logo do OpFlix"/>
                <h2>OpFlix</h2>
              </div>

              <div id="textgroup_banner">
                <p id="texto_banner">Os principais lançamentos
                    do mundo cinematográfico
                    na sua mão!
                </p>
                <a id="link_banner">Comece agora</a>
              </div>

            </div>
          </section>

          <section className="conteudo_lancamentos container">
            <div className="content">
              <h3>Lançamentos chegando</h3>
              <div className="box_lancamento">
                <h4 className="titulo_lancamento">Vingadores</h4>
                <p className="caracteristicas_lancamento"><b>Tipo:</b>Filme</p>
                <p className="caracteristicas_lancamento"><b>Gênero:</b>Ficção</p>
                <p className="caracteristicas_lancamento"><b>Plataforma:</b>Cinema</p>
                <p className="caracteristicas_lancamento"><b>Duração:</b>182min</p>
                <p className="caracteristicas_lancamento sinopse" ><b>Sinopse:</b>Homem de Ferro, Thor, Hulk e os Vingadores se unem para combater seu inimigo mais poderoso,o maligno Thanos. Em uma missão para coletar todas as seis pedras infinitas, Thanos planeja usá-las para infligir sua vontade maléfica sobre a realidade</p>
              
                <h5 className="data_lancamento">16/09/2030</h5>
              </div>
            </div>
          </section>
      
        </main>
      
      </div>
    );
  }
}
  
  export default App;
