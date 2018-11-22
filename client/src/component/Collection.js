import React, { Component } from "react";
import { getFav, fav } from "../actions/auth";
import { getPokemons } from "./pokedex/pokemondata";
import Card from "./pokedex/Card";

let pokemons = getPokemons();
class Collections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fav: []
    };
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      getFav().then(result => {
        this.setState({
          fav: result.split(",")
        });
      });
    }
  }

  updateLocalFav = pkmn => {
    console.log(this.state.fav);
    if (!this.props.isLoggedIn) {
      alert("Please login to continue!");
    } else {
      let newfav = this.state.fav;
      let pos = newfav.indexOf(pkmn);
      if (pos === -1) {
        newfav.push(pkmn);
      } else {
        newfav.splice(pos, 1);
      }
      this.setState({ fav: newfav });
      fav(pkmn);
    }
  };

  render() {
    const filteredPokemon = pokemons.filter(pokemon => {
      let mon = pokemon.name.toLowerCase();
      return this.state.fav.indexOf(mon) > -1;
    });

    return (
      <React.Fragment>
        <div className="wrapper">
          <div className="list">
            {filteredPokemon.length > 0 &&
              filteredPokemon.map(pokemon => (
                <Card
                  pokemon={pokemon}
                  key={pokemon.name}
                  isfav={
                    this.state.fav.indexOf(pokemon.name.toLowerCase()) > -1
                  }
                  updateFav={this.updateLocalFav}
                />
              ))}
            {filteredPokemon.length === 0 && (
              <div className="list--empty">
                <p>Oops! You do not have any Pokemon!</p>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Collections;
