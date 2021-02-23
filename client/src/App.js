import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Testpage from "./Testpage";
import LandingPage from "./components/LandingPage/LandingPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import LoginPage from "./components/LoginPage/LoginPage";
import NavBar from "./components/NavBar/NavBar";
import ServiceRequestPage from "./components/ServiceRequestPage/ServiceRequestPage";

function App() {
  return (
    <Router>
      <NavBar />
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/signup" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/servicerequest" component={ServiceRequestPage} />
          <Route exact path="/test" component={Testpage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
