import React, { Component } from "react";
import PopcornIcon from "../../assets/img/popcorn-icon.png";
import "../../assets/css/Mapa.css"

export default class Pin extends Component {
    render() {
        return (
            <div className="pin-marker">
                <img src={PopcornIcon} alt="" className="pin-icon"/>
                <p>{this.props.lancamento.titulo}</p>
                {/* <p>{this.props.lancamento.DataLancamento}</p> */}
            </div>
        )
    }
}