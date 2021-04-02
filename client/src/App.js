import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import cookie from "react-cookies";
import Testpage from "./Testpage";
import LandingPage from "./pages/LandingPage/LandingPage";
import ServiceRequestPage from "./pages/ServiceRequestPage/ServiceRequestPage";
import ITSRPage from "./pages/ITSRPage/ITSRpage";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const userInfos = useSelector((state) => state.auth.userInfos);

  useEffect(() => {
    if (cookie.load("token")) {
      setAuthenticated(true);
    }
    console.log(cookie.load("token"));
  }, [userInfos]);

  // console.log(authenticated);

  return (
    <div className="page-container">
      <div className="content-wrap">
        <Router>
          <NavBar />
          <div>
            <Switch>
              <Route exact path="/" component={LandingPage} />

              <ProtectedRoute
                authenticated={authenticated}
                component={ServiceRequestPage}
                path="/servicerequest"
                exact
              />
              <ProtectedRoute
                authenticated={authenticated}
                component={ITSRPage}
                path="/itsr"
                exact
              />

              <Route exact path="/test" component={Testpage} />
            </Switch>
          </div>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
