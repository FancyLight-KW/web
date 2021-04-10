import React, { useEffect, useState } from "react";
import chatbotimg from "../../assets/Chatbot.jpg";
import cookie from "react-cookies";
import { useSelector } from "react-redux";

function Footer() {
  const [authenticated, setAuthenticated] = useState(false);
  const userInfos = useSelector((state) => state.auth.userInfos);

  useEffect(() => {
    if (cookie.load("token")) {
      setAuthenticated(true);
    }
    // console.log(cookie.load("token"));
  }, [userInfos]);

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        bottom: "0",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {authenticated ? <img src={chatbotimg} width="80" height="80" /> : null}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "x-small",
        }}
      >
        <p>&copy;{new Date().getFullYear()} FANCY LIGHT</p>
      </div>
    </div>
  );
}

export default Footer;
