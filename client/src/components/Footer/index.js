import React, { useEffect, useState } from "react";
import chatbotimg from "../../assets/Chatbot.png";
import cookie from "react-cookies";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Chatbot from "../../Chatbot/index/index";

const HoverImage = styled.div`
  &:hover {
    opacity: 0.8;
  }
`;
const ChatContainer = styled.div`
  width: 500px;
  position: fixed;
  z-index: 1;
  top: 160px;
  right: 45px;
  overflow-x: hidden;
  padding: 8px 0;
`;

const IconContainer = styled.div`
  width: 500px;
  position: fixed;
  z-index: 1;
  top: 840px;
  right: -400px;
  overflow-x: hidden;
  padding: 8px 0;
`;
const SideChat = styled(Chatbot)`
  display: block;
`;

function Footer() {
  const [authenticated, setAuthenticated] = useState(false);
  const [chatbotVisible, setChatbotVisible] = useState(false);
  const userInfos = useSelector((state) => state.auth.userInfos);

  const chatbotHandler = () => {
    setChatbotVisible(!chatbotVisible);
    console.log(chatbotVisible);
  };

  useEffect(() => {
    if (cookie.load("token")) {
      setAuthenticated(true);
    }
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
      {authenticated ? (
        chatbotVisible ? (
          <>
            <ChatContainer>
              <SideChat />
            </ChatContainer>
            <IconContainer>
              <HoverImage>
                <img
                  src={chatbotimg}
                  width="80"
                  height="80"
                  onClick={chatbotHandler}
                />
              </HoverImage>
            </IconContainer>
          </>
        ) : (
          <IconContainer>
            <HoverImage>
              <img
                src={chatbotimg}
                width="80"
                height="80"
                onClick={chatbotHandler}
              />
            </HoverImage>
          </IconContainer>
        )
      ) : null}

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
