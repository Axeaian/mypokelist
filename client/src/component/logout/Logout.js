import React, { Component } from "react";

class Logout extends Component {
  async componentDidMount() {
    try {
      await fetch("/user/logout", {
        method: "get",
        headers: { "Content-Type": "application/json" }
      });
      this.props.updateLogStatus("");
      this.props.history.push("/");
      alert("You are logged out!");
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return <div />;
  }
}

export default Logout;
