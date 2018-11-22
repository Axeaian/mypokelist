import React, { Component } from "react";
import Navbar from "../navigation/Navbar";
import "./Signup.css";
import { signup } from "../../actions/auth";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      dob: "",
      country: "",
      email: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSignup = e => {
    const { username, password, dob, country, email } = this.state;
    e.preventDefault();
    signup(username, password, dob, country, email);
    this.props.history.push("/login");
    alert("Thanks for signing up! \n Please login to continue");
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <form className="signupform" onSubmit={this.handleSignup}>
            <div>
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
              <label>Date of Birth</label>
              <input type="date" name="dob" onChange={this.handleChange} />
              <label>Country</label>
              <input
                type="country"
                placeholder="Enter country"
                name="country"
                onChange={this.handleChange}
              />
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={this.handleChange}
              />
              <button id="signup" type="submit">
                Continue!
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
