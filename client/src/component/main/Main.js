import React, { Component } from "react";
import "./Main.css";

class Main extends Component {
  alert = () => {
    alert("You will be redirected to an external page...");
  };

  render() {
    return (
      <div>
        <div className="cover" />
        <div className="banner">
          <div className="watch">
            <a
              href="https://www.pokemon.com/us/pokemon-episodes/"
              onClick={this.alert}
            >
              <img
                src="http://multilingualbooks.com/wp/cartoons/files/2013/01/pokemon-2013.jpg"
                alt="Watch!"
              />
              <p className="label-img">Watch Episodes >>> </p>
            </a>
          </div>
          <div className="Merchandise">
            <a
              href="http://www.pokemoncenter.com/?utm_source=p&utm_medium=referral&utm_term=GUS"
              onClick={this.alert}
            >
              <img
                src="https://assets.pokemon.com/assets/cms2/img/misc/countries/sg/country_detail_pokemon.png"
                alt="Watch!"
              />
              <p className="label-img">Buy Merchandises >>> </p>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
