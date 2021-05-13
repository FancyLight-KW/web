import * as React from "react";
import axios from "axios";
import Chatbot from "./Chatbot/index/index";
import cookie from "react-cookies";
import Maximized from "./components/Chat/Maximized";
import Minimized from "./components/Chat/Minimized";
import {
  ThemeProvider,
  FixedWrapper,
  darkTheme,
  elegantTheme,
  purpleTheme,
  defaultTheme,
} from "@livechat/ui-kit";
import chatbotimg from "./assets/Chatbot.png";
import styled from "styled-components";
const themes = {
  defaultTheme: {
    FixedWrapperMaximized: {
      css: {
        boxShadow: "0 0 1em rgba(0, 0, 0, 0.1)",
      },
    },
  },
  purpleTheme: {
    ...purpleTheme,
    TextComposer: {
      ...purpleTheme.TextComposer,
      css: {
        ...purpleTheme.TextComposer.css,
        marginTop: "1em",
      },
    },
    OwnMessage: {
      ...purpleTheme.OwnMessage,
      secondaryTextColor: "#fff",
    },
  },
  elegantTheme: {
    ...elegantTheme,
    Message: {
      ...darkTheme.Message,
      secondaryTextColor: "#fff",
    },
    OwnMessage: {
      ...darkTheme.OwnMessage,
      secondaryTextColor: "#fff",
    },
  },
  darkTheme: {
    ...darkTheme,
    Message: {
      ...darkTheme.Message,
      css: {
        ...darkTheme.Message.css,
        color: "#fff",
      },
    },
    OwnMessage: {
      ...darkTheme.OwnMessage,
      secondaryTextColor: "#fff",
    },
    TitleBar: {
      ...darkTheme.TitleBar,
      css: {
        ...darkTheme.TitleBar.css,
        padding: "1em",
      },
    },
  },
};

const commonThemeButton = {
  fontSize: "16px",
  padding: "1em",
  borderRadius: ".6em",
  margin: "1em",
  cursor: "pointer",
  outline: "none",
  border: 0,
};

const themePurpleButton = {
  ...commonThemeButton,
  background: "linear-gradient(to right, #6D5BBA, #8D58BF)",
  color: "#fff",
};

const themeDarkButton = {
  ...commonThemeButton,
  background: "rgba(0, 0, 0, 0.8)",
  color: "#fff",
};

const themeDefaultButton = {
  ...commonThemeButton,
  background: "#427fe1",
  color: "#fff",
};

const themeElegantButton = {
  ...commonThemeButton,
  background: "#000",
  color: "#D9A646",
};

const HoverImage = styled.div`
  &:hover {
    opacity: 0.8;
  }
`;
// test proxy
//class Testpage extends React.Component {
// state = {
//     theme: 'defaultTheme'
// }

// handleThemeChange = ({ target }) => {
//     console.log('target.name', target.name)
//     this.setState({
//         theme: target.name + 'Theme'    ,
//     })
// }

/*
  const newIntent = {
    displayName: 'WeatherIntent',
    trainingPhrasesParts: [
      'Hello, What is weather today?',
      'How is the weather today?',
    ],
    messageTexts: ['Rainy', 'Sunny'],
  } */

/* const newIntent = {
    displayName: 'WeatherIntent',
    updatedTrainingPhrasesParts: [
      'Hello, What is weather today?',
      'How is the weather today?',
      'added',
    ],
    updatedMessageTexts: ['Rainy', 'Sunny', 'cloudy'],
  } */
const Testpage = (props) => {
  const newIntent = {
    displayName: 'neoguri - custom-3',
    trainingPhrasesParts: [
      'neeoguricustom2',
    ],
    messageTexts: ['this is neoguri - custom-3'],
  };
  axios
    .post(`${process.env.REACT_APP_API_HOST}/dialogflow/createIntent`, newIntent,
    {
      headers: {
        Authorization: `Bearer ${cookie.load("token")}`,
      },
    })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });

  //render() {
  return (
    <div></div>
    // <ThemeProvider theme='defaultTheme'>
    //   <div>
    //     <FixedWrapper.Root minimizedOnInit>
    //       <FixedWrapper.Maximized>
    //         <Maximized {...props} />
    //       </FixedWrapper.Maximized>
    //       <FixedWrapper.Minimized>

    //         <Minimized {...props}>
    //         {/* <img src={chatbotimg}></img> */}
    //         </Minimized>
    //       </FixedWrapper.Minimized>
    //     </FixedWrapper.Root>
    //   </div>
    // </ThemeProvider>
  );
  //}
  //}
};
export default Testpage;
