import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { StartPage } from "./components/startpage/StartPage";
import PreCadastro from "./components/presignup/PreCadastro";
import PreCadastroONG from "./components/presignup/PreCadastroONG";
import Login from "./components/Login";
import ShowOngs from "./components/ShowOngs";
import ONG from "./components/ONG";
import ONGs from "./components/ONGs";
import Users from "./components/Users";
import User from "./components/User";
import Dash from "./components/Dash";
import Profile from "./components/Profile"

export class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={StartPage} />
          <Route exact path="/pre-cadastro-doador" component={PreCadastro} />
          <Route exact path="/pre-cadastro-ong" component={PreCadastroONG} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/ongs" component={ONGs} />
          <Route exact path="/ong" component={ONG} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/user" component={User} />
          <Route exact path="/showongs" component={ShowOngs} />
          <Route exact path="/dashboard" component={Dash} />
          <Route exatc path= "/profile" component= {Profile}/>
        </div>
      </Router>
    );
  }
}

export default App;
