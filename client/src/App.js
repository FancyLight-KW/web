import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import cookie from "react-cookies";
import { Helmet } from "react-helmet";
import favicon from "./assets/favicon.ico";
import Testpage from "./Testpage";
import LandingPage from "./pages/LandingPage/LandingPage";
import SRPage from "./pages/SRPage/SRPage";
import ITSRPage from "./pages/ITSRPage/ITSRpage";
import MySRPage from "./pages/MySRPage/MySRPage";
import SRAgentPage from "./pages/SRAgentPage/SRAgentPage";
import SRAdminPage from "./pages/SRAdminPage/SRAdminPage";
import RevisePage from "./pages/ReivsePage/RevisePage";
import IntentMainPage from "./pages/IntentMainPage";
import RegisterIntentPage from "./pages/RegisterIntentPage";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer";
import ProtectedRoute from "./ProtectedRoute";
import ManageIntentPage from "./pages/ManageIntentPage";
import AddFollowupIntentPage from "./pages/AddFollowupIntentPage";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const userInfos = useSelector((state) => state.auth.userInfos);

  useEffect(() => {
    if (cookie.load("token")) {
      setAuthenticated(true);
    }
    // console.log(cookie.load("token"));
  }, [userInfos]);

  // console.log(authenticated);
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Helmet>
          <title>ITSP</title>
          <link rel="icon" href={favicon} />
        </Helmet>
        <Router>
          <NavBar />
          <>
            <Switch>
              <Route exact path="/" component={LandingPage} />

              <ProtectedRoute
                authenticated={authenticated}
                component={SRPage}
                path="/servicerequest"
                exact
              />
              <ProtectedRoute
                authenticated={authenticated}
                component={ITSRPage}
                path="/itsr"
                exact
              />
              <Route exact path="/mysr" component={MySRPage} />
              <Route exact path="/sragent" component={SRAgentPage} />
              <Route exact path="/sradmin" component={SRAdminPage} />
              <Route exact path="/revise/:reqNo" component={RevisePage} />
              <Route exact path="/intentmain" component={IntentMainPage} />
              <Route
                exact
                path="/manageintent/:intentname"
                component={ManageIntentPage}
              />
              <Route
                exact
                path="/registerintent"
                component={RegisterIntentPage}
              />
              <Route
                exac
                path="/addfollowupintent/:parentName"
                component={AddFollowupIntentPage}
              />
              <Route exact path="/test" component={Testpage} />
            </Switch>
          </>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
