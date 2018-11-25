import React, { Component } from "react";
import Card from "./Card";
import { getPokemons } from "./pokemondata";
import "./pokedex.css";
import { getFav, fav } from "../../actions/auth";
import { setTimeout } from "timers";

let pokemons = getPokemons();

class Pokedex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      fav: []
    };
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      setTimeout(async () => {
        await getFav().then(result => {
          this.setState({
            fav: result.pokemon.split(",")
          });
          console.log(result.pokemon);
        });
      }, 500);
    }
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

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
      return mon.indexOf(this.state.value.toLowerCase()) > -1;
    });

    return (
      <React.Fragment>
        <div className="wrapper">
          <form className="filterInput">
            <input
              type="text"
              placeholder="Search your Pokedex!"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </form>
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
                <p>Oops! We don't have the pokemon you are looking for!</p>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Pokedex;
