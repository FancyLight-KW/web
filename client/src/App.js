import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Testpage from "./Testpage";
import LandingPage from "./components/LandingPage/LandingPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import LoginPage from "./components/LoginPage/LoginPage";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer";
import ServiceRequestPage from "./components/ServiceRequestPage/ServiceRequestPage";
import ITSRPage from "./components/ITSRPage/ITSRpage";

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
          <Route exact path="/itsr" component={ITSRPage} />
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
