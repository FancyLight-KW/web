import * as React from "react";
import axios from "axios";
import Chatbot from './Chatbot/index/index';

import Maximized from './components/Chat/Maximized'
import Minimized from './components/Chat/Minimized'
import { ThemeProvider, FixedWrapper, darkTheme, elegantTheme, purpleTheme, defaultTheme } from '@livechat/ui-kit'

const themes = {
  defaultTheme: {
      FixedWrapperMaximized: {
          css: {
              boxShadow: '0 0 1em rgba(0, 0, 0, 0.1)',
          },
      },
  },
  purpleTheme: {
      ...purpleTheme,
      TextComposer: {
          ...purpleTheme.TextComposer,
          css: {
              ...purpleTheme.TextComposer.css,
              marginTop: '1em',
          },
      },
      OwnMessage: {
          ...purpleTheme.OwnMessage,
          secondaryTextColor: '#fff',
      },
  },
  elegantTheme: {
      ...elegantTheme,
      Message: {
          ...darkTheme.Message,
          secondaryTextColor: '#fff',
      },
      OwnMessage: {
          ...darkTheme.OwnMessage,
          secondaryTextColor: '#fff',
      },
  },
  darkTheme: {
      ...darkTheme,
      Message: {
          ...darkTheme.Message,
          css: {
              ...darkTheme.Message.css,
              color: '#fff',
          },
      },
      OwnMessage: {
          ...darkTheme.OwnMessage,
          secondaryTextColor: '#fff',
      },
      TitleBar: {
          ...darkTheme.TitleBar,
          css: {
              ...darkTheme.TitleBar.css,
              padding: '1em',
          },
      },
  },
}

const commonThemeButton = {
  fontSize: '16px',
  padding: '1em',
  borderRadius: '.6em',
  margin: '1em',
  cursor: 'pointer',
  outline: 'none',
  border: 0,
}

const themePurpleButton = {
  ...commonThemeButton,
  background: 'linear-gradient(to right, #6D5BBA, #8D58BF)',
  color: '#fff',  
}

const themeDarkButton = {
  ...commonThemeButton,
  background: 'rgba(0, 0, 0, 0.8)',
  color: '#fff',  
}

const themeDefaultButton = {
  ...commonThemeButton,
  background: '#427fe1',
  color: '#fff',  
}

const themeElegantButton = {
  ...commonThemeButton,
  background: '#000',
  color: '#D9A646',  
}
// test proxy
class Testpage extends React.Component {
  // state = {
  //     theme: 'defaultTheme'
  // }
  
  // handleThemeChange = ({ target }) => {
  //     console.log('target.name', target.name)
  //     this.setState({
  //         theme: target.name + 'Theme'    ,
  //     })
  // }

  render() {
      return (
        <ThemeProvider theme='defaultTheme'>
          <div>
            <FixedWrapper.Root minimizedOnInit>
              <FixedWrapper.Maximized>
                <Maximized {...this.props} />
              </FixedWrapper.Maximized>
              <FixedWrapper.Minimized>
                <Minimized {...this.props} />
              </FixedWrapper.Minimized>
            </FixedWrapper.Root>
          </div>
        </ThemeProvider>
      )
  }
}

export default Testpage;
