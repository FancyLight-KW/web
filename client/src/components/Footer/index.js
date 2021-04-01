import React from "react";
import chatbotimg from "../../assets/Chatbot.jpg";

function Footer() {
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
        <img src={chatbotimg} width="80" height="80" />
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
