import "./Card.css";
import React, { Component } from "react";

class Card extends Component {
  render() {
    let icon_class;
    const { name, types, art_url, pkdx_id } = this.props.pokemon;

    if (this.props.isfav) {
      icon_class = "fas fa-heart";
    } else {
      icon_class = "far fa-heart";
    }
    return (
      <div className="listItem">
        <div className="poke">
          <h4 className="poke_index"># {("000" + pkdx_id).substr(-3)}</h4>
          <i
            className={icon_class}
            onClick={() => this.props.updateFav(name.toLowerCase())}
          />
          <a
            href={"https://www.pokemon.com/us/pokedex/" + name}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={art_url} alt={name} />
          </a>
          <h2 className="listItem_name">{name}</h2>

          <div>
            {types.map(type => (
              <p id="badge" className={type} key={name + type}>
                {type.toUpperCase()}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
