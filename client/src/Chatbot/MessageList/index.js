import React, {useEffect, useState, useRef} from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';

import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../../actions/message_actions';
import Message_local from '../Sections/Message';
import { List, Avatar } from 'antd';
import { RobotOutlined } from '@ant-design/icons'
import cookie from "react-cookies";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router";
import './MessageList.css';

const MY_USER_ID = 'apple';

export default function MessageList(props) {
  const [messages, setMessages] = useState([])

  const dispatch = useDispatch();
  const messagesFromRedux = useSelector(state => state.message.messages);
  let history = useHistory();
  useEffect(() => {

      eventQuery('welcomeToMyWebsite')

  }, []);

  const textQuery = async (text) => {

    //  First  Need to  take care of the message I sent     
    let conversation = {
        who: 'user',
        content: {
            text: {
                text: text
            }
        }
    }

    dispatch(saveMessage(conversation))
    // console.log('text I sent', conversation)

    // We need to take care of the message Chatbot sent 
    const textQueryVariables = {
        text
    }
    try {
        //I will send request to the textQuery ROUTE 
        const response = await Axios.post('http://localhost:5000/api/dialogflow/textQuery', textQueryVariables,
        {
            headers: {
              Authorization: `Bearer ${cookie.load("token")}`,
            },
          })

        for (let content of response.data.fulfillmentMessages) {

            conversation = {
                who: 'bot',
                content: content
            }

            dispatch(saveMessage(conversation))
        }


    } catch (error) {
        conversation = {
            who: 'bot',
            content: {
                text: {
                    text: " Error just occured, please check the problem"
                }
            }
        }

        dispatch(saveMessage(conversation))

    }

}


const eventQuery = async (event) => {

    // We need to take care of the message Chatbot sent 
    const eventQueryVariables = {
        event
    }
    try {
        //I will send request to the textQuery ROUTE 
        const response = await Axios.post('http://localhost:5000/api/dialogflow/eventQuery', eventQueryVariables,
        {
            headers: {
              Authorization: `Bearer ${cookie.load("token")}`,
            },
          })
        for (let content of response.data.fulfillmentMessages) {

            let conversation = {
                who: 'bot',
                content: content
            }

            dispatch(saveMessage(conversation))
        }


    } catch (error) {
        let conversation = {
            who: 'bot',
            content: {
                text: {
                    text: " Error just occured, please check the problem"
                }
            }
        }
        dispatch(saveMessage(conversation))
    }

}

  const renderMessages = (messagesFromRedux) => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.author === MY_USER_ID;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;
        
        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  }
  const keyPressHanlder = (e) => {
    if (e.key === "Enter") {

        if (!e.target.value) {
            return alert('you need to type somthing first')
        }

        //we will send request to text query route 
        textQuery(e.target.value)


        e.target.value = "";
    }
}

// const renderCards = (cards) => {
//     return cards.map((card,i) => <Card key={i} cardInfo={card.structValue} />)
// }



const renderOneMessage = (message, i, addmessage = false) => {
    console.log('message', message)
  let previous = messagesFromRedux.previous();
  let current = messagesFromRedux.current();
  let next = messagesFromRedux.next();
  let prevBySameAuthor = false;
  let nextBySameAuthor = false;
  let startsSequence = true;
  let endsSequence = true;
  let showTimestamp = true;

  //let previousMoment = moment(previous.timestamp);
 // let previousDuration = moment.duration(currentMoment.diff(previousMoment));
  prevBySameAuthor = previous.author === current.author;

  // if (prevBySameAuthor && previousDuration.as('hours') < 1) {
  //   startsSequence = false;
  // }

  // if (previousDuration.as('hours') < 1) {
  //   showTimestamp = false;
  // }
    

    // we need to give some condition here to separate message kinds 
    
    // template for normal text 
    if (message.content && message.content.text && message.content.text.text) {
        if(message.content.text.text == "요청 페이지로 이동합니다."){
            history.push("/itsr");
            message.content.text.text = "";
        }
          
        return <Message 
        key={i} 
        who={message.who} 
        text={message.content.text.text}
        //startsSequence={startsSequence}
        //endsSequence={endsSequence}
        //showTimestamp={showTimestamp}
         />
    } //else if (message.content && message.content.payload.fields.card) {

    //     const AvatarSrc = message.who === 'bot' ? <RobotOutlined type="robot" /> : <RobotOutlined type="smile" />
    //     return <div>
    //         <List.Item style={{ padding: '1rem' }}>
    //             <List.Item.Meta
    //                 avatar={<Avatar icon={AvatarSrc} />}
    //                 title={message.who}
    //                 description={renderCards(message.content.payload.fields.card.listValue.values)}
    //             />
    //         </List.Item>
    //     </div>
    // }

    // template for card message 

}

const renderMessage = (returnedMessages) => {

    if (returnedMessages) {
        return returnedMessages.map((message, i) => {
            return renderOneMessage(message, i);
        })
    } else {
        return null;
    }
}
  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
      scrollToBottom()
  });

    return(
      <div className="message-list">
        <Toolbar
          title="Conversation Title"
          rightItems={[
            <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
            <ToolbarButton key="video" icon="ion-ios-videocam" />,
            <ToolbarButton key="phone" icon="ion-ios-call" />
          ]}
        />

        <div className="message-list-container">{renderMessage(messagesFromRedux)}</div>

        <Compose rightItems={[
          <ToolbarButton key="photo" icon="ion-ios-camera" />,
          <ToolbarButton key="image" icon="ion-ios-image" />,
          <ToolbarButton key="audio" icon="ion-ios-mic" />,
          <ToolbarButton key="money" icon="ion-ios-card" />,
          <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
          <ToolbarButton key="emoji" icon="ion-ios-happy" />
        ]}/>
      </div>
    );
}