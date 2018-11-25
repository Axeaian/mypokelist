import React, { Component } from "react";
import "./Login.css";
import { login } from "../../actions/auth";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      user: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLogin = e => {
    e.preventDefault();
    let logincheck = login(this.state.username, this.state.password);
    logincheck.then(output => {
      if (output.user) {
        this.props.updateLogStatus(this.state.username);
      } else {
        alert(output.message);
      }
    });
  };

  render() {
    return (
      <div>
        <div className="container g2">
          <div className="loginform">
            <h2>Login</h2>
            <div className="item">
              <form onSubmit={this.handleLogin}>
                <label>Username</label>
                <input
                  type="text"
                  placeholder="Enter username"
                  name="username"
                  onChange={this.handleChange}
                />
                <label>Password</label>
                <input
                  type="text"
                  placeholder="Enter password"
                  name="password"
                  onChange={this.handleChange}
                />
                <button id="signin" type="submit">
                  Login!
                </button>
              </form>
            </div>
          </div>
          <div className="signup">
            <h2>Signup</h2>
            <div className="item pik">
              <p>
                Create a XXX account today! With a XXX account, you can manage
                your own profile, view a collection of your favourite Pokémon,
                and much more!
              </p>
              <a href="/signup">
                <button id="signup">Sign up!</button>
              </a>
              <div className="pikachuimg">
                <img
                  src="http://static.pokemonpets.com/images/monsters-images-300-300/2025-Shiny-Pikachu.png"
                  alt="Pikachu welcome"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
