import React, { Component } from "react";

class Logout extends Component {
  async componentDidMount() {
    try {
      await fetch("/user/logout", {
        method: "get",
        mode: "cors",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });
      this.props.updateLogStatus("");
      this.props.history.push("/");
      alert('You are logged out!')
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default Logout;
