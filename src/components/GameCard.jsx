import "./GameCard.css";
import {Play} from 'lucide-react';

export function GameCard({title, category, imagem}){
    return(
        <div className="vortex-card">
            <img src={imagem} alt={title} className="card-img"/>

            <div className="card-info">

                <h4>{title}</h4>
                <p>{category}</p> <br/>
                <button className="play-bnt"><Play size={14} fill="white"/></button>
            </div>
        </div>
    )
}