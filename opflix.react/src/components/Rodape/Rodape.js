import React,{Component} from "react";
import locationIcon from "../../assets/img/location-icon.png"

export default function Rodape(){
    return(
        <footer>
            <div>
                <img src={locationIcon}/>
                <p></p>
            </div>
            <div></div>
        </footer>
    )
}