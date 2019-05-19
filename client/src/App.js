import React from "react";
import "./App.css";
import Navbar from "./Components/Layout/Navbar.js";
import Home from "./Components/Layout/Home.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./Components/auth/Register.js";
import Login from "./Components/auth/Login.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Home} />
        <section className="container">
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </section>
      </div>
    </Router>
  );
}

export default App;
