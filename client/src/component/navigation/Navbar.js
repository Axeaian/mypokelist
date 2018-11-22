import React, { Component } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    let logbutton;
    if (this.props.isLoggedIn) {
      logbutton = (
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      );
    } else {
      logbutton = (
        <li>
          <Link to="/login">Login</Link>
        </li>
      );
    }
    return (
      <div className="navbar">
        <div id="logo">
          <Link to="/">
            <img
              className="tilt pokeball"
              src="https://vignette.wikia.nocookie.net/youtubepoop/images/4/4c/Pokeball.png/revision/latest?cb=20150418234807"
              alt="Pokemon"
            />
          </Link>
        </div>
        <div id="menu">
          <ul>
            <li>
              <Link to="/pokedex">Pokédex</Link>
            </li>
            <li>
              <Link to="/collection">My Collection</Link>
            </li>
            {logbutton}
          </ul>
        </div>
      </div>
    );
  }
}

export default Navbar;
