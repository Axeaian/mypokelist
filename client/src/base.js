import React, { Component } from "react";
import Navbar from "../navigation/Navbar";
import Main from "./component/main/Main";
import Pokedex from "./component/pokedex/pokedex";
import Login from "./component/login/Login";

class Base extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloggedIn: false,
      page: "Main"
    };
  }

  render() {
    const page = this.state.page;
    let item;
    if (page === "Main") {
      item = <Main />;
    }
    if (page === "Pokedex") {
      item = <Pokedex />;
    }
    // if (page === "My Collection") {
    //   item = <Collection />;
    // }
    if (page === "Login") {
      item = <Login />;
    }

    return (
      <div>
        <Navbar isloggedIn={this.state.isloggedIn} />
        {item}
      </div>
    );
  }
}

export default Base;
