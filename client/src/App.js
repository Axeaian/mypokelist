import React, { Component } from "react";
import "./App.css";
import Navbar from "./component/navigation/Navbar";
import Main from "./component/main/Main";
import Pokedex from "./component/pokedex/pokedex";
import Login from "./component/login/Login";
import Logout from "./component/logout/Logout";
import Signup from "./component/signup/Signup";
import Collection from "./component/Collection";
import ErrorPage from "./ErrorPage";
import { checkAuth } from "./actions/auth";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloggedIn: false,
      user: "",
      fav: []
    };
  }
  async componentWillMount() {
      await checkAuth().then(result => {
        this.setState({
          isloggedIn: result.authenticated
        });
      });
  }

  updateLoggedIn = name => {
    this.setState({
      isloggedIn: !this.state.isloggedIn,
      user: name
    });
  };

  render() {
    return (
      <div>
        <Router>
          <React.Fragment>
            <Navbar isLoggedIn={this.state.isloggedIn} name={this.state.user} />
            <Switch>
              <Route path="/" exact component={Main} />
              <Route
                path="/pokedex"
                render={() => <Pokedex isLoggedIn={this.state.isloggedIn} />}
              />
              <Route
                path="/collection"
                render={() => {
                  return this.state.isloggedIn ? (
                    <Collection isLoggedIn={this.state.isloggedIn} />
                  ) : (
                    <Login updateLogStatus={this.updateLoggedIn} />
                  );
                }}
              />
              <Route
                path="/login"
                render={() => {
                  return this.state.isloggedIn ? (
                    <Redirect to="/pokedex" />
                  ) : (
                    <Login updateLogStatus={this.updateLoggedIn} />
                  );
                }}
              />
              <Route
                path="/logout"
                render={props => {
                  return this.state.isloggedIn ? (
                    <Logout
                      history={props.history}
                      updateLogStatus={this.updateLoggedIn}
                    />
                  ) : (
                    <Redirect to="/login" />
                  );
                }}
              />
              <Route path="/signup" component={Signup} />
              <Route component={ErrorPage} />
            </Switch>
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
