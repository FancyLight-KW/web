import React, { useEffect, useState } from "react";
import chatbotimg from "../../assets/Chatbot.png";
import cookie from "react-cookies";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Chatbot from "../../Chatbot/index/index";
import Maximized from "../Chat/Maximized";
import Minimized from "../Chat/Minimized";
import {
  ThemeProvider,
  FixedWrapper,
  darkTheme,
  elegantTheme,
  purpleTheme,
  defaultTheme,
} from "@livechat/ui-kit";
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
const SideChat = styled(Maximized)`
  display: block;
`;

const Footer = (props) => {
  const [authenticated, setAuthenticated] = useState(false);
  const userInfos = useSelector((state) => state.auth.userInfos);

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
      }}
    >
      {authenticated ? (
        <ThemeProvider theme="defaultTheme">
          <div>
            <FixedWrapper.Root minimizedOnInit>
              <FixedWrapper.Maximized>
                <Maximized {...props} />
              </FixedWrapper.Maximized>
              <FixedWrapper.Minimized>
                <Minimized {...props}>
                  {/* <img src={chatbotimg}></img> */}
                </Minimized>
              </FixedWrapper.Minimized>
            </FixedWrapper.Root>
          </div>
        </ThemeProvider>
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
};

export default Footer;
