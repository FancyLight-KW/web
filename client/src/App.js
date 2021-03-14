import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Testpage from "./Testpage";
import LandingPage from "./components/LandingPage/LandingPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import LoginPage from "./components/LoginPage/LoginPage";
import NavBar from "./components/NavBar/NavBar";
import ServiceRequestPage from "./components/ServiceRequestPage/ServiceRequestPage";
import Request from "./components/Modal/Request";

function App() {
  return (
    <Router>
      <NavBar />
      <div>
        <Switch>
          <Route exact path="/signup" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/servicerequest" component={ServiceRequestPage} />
          <Route exact path="/test" component={Testpage} />
          <Route exact path="/request" component={Request} />
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
