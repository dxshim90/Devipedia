import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./Components/Layout/Navbar.js";
import Home from "./Components/Layout/Home.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./Components/auth/Register.js";
import Login from "./Components/auth/Login.js";
import { Provider } from "react-redux";
import store from "./store.js";
import Alert from "./Components/Layout/Alert.js";
import { loadUser } from "./Actions/auth.js";
import { setAuthToken } from "./Actions/auth.js";
import Dashboard from "./Components/Dashboard/dashboard";
import PrivateRoute from "./Components/Routing/Privateroute.js";
import CreateProfile from "./Components/Profile-forms/createprofile.js";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Home} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/Dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/createprofile"
                component={CreateProfile}
              />
            </Switch>
          </section>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
