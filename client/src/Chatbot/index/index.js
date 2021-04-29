import React, { useEffect, useRef } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../../actions/message_actions';
import Message_local from '../Sections/Message';
import PropTypes from "prop-types";
import styled from "styled-components";
import cookie from "react-cookies";
import jwt_decode from "jwt-decode";
import Moment from 'moment'
import 'moment/locale/ko';

import { ThemeProvider } from '@livechat/ui-kit'

import { useHistory } from "react-router";
import { Modal, Button } from 'antd';  


//
import './Compose.css'
import '../Sections/style.css'
// import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
// import {
//   MainContainer,
//   ChatContainer,
//   MessageList,
//   Message,
//   MessageInput,
// } from "@chatscope/chat-ui-kit-react";
//import Card from "./Sections/Card";

function Chatbot() {

    const dispatch = useDispatch();
    const messagesFromRedux = useSelector(state => state.message.messages)
    let history = useHistory();
    useEffect(() => {

        eventQuery('welcomeToMyWebsite')

    }, [])


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
            const response = await Axios.post(`${process.env.REACT_APP_API_HOST}/dialogflow/textQuery`, textQueryVariables,
            {
                headers: {
                  Authorization: `Bearer ${cookie.load("token")}`,
                },
              })

            for (let content of response.data.fulfillmentMessages) {

                conversation = {
                    who: 'bot',
                    content: content,
                    timestamp: Date.now(),
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
                },
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
            const response = await Axios.post(`${process.env.REACT_APP_API_HOST}/dialogflow/eventQuery`, eventQueryVariables,
            {
                headers: {
                  Authorization: `Bearer ${cookie.load("token")}`,
                },
              })
            for (let content of response.data.fulfillmentMessages) {

                let conversation = {
                    who: 'bot',
                    content: content,
                    timestamp: Date.now(),
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
                },
            }
            dispatch(saveMessage(conversation))
        }

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

        // we need to give some condition here to separate message kinds 
        
        // template for normal text 
        if (message.content && message.content.text && message.content.text.text) {
            if(message.content.text.text == "요청 페이지로 이동합니다."){
                history.push("/itsr");
                message.content.text.text = "";
            }
            return <Message_local key={i} who={message.who} text={message.content.text.text} moment={message.moment} />
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

    const nowTime = Moment().format('YYYY년 MM월 HH:mm');
    return (
        <>
            <div style={{
            height: 650, width: 400,
            border: '3px solid black', borderRadius: '7px', backgroundColor: 'white'
        }}>
            

            <div style={{ height: 594, width: '100%', overflow: 'auto' }}>
            <div className="timestamp">
                {nowTime}
            </div>

                {renderMessage(messagesFromRedux)}

                <div ref={messagesEndRef} />
            </div >
            <input
                style={{
                    margin: 0, width: '100%', height: 50,
                    borderRadius: '4px', padding: '5px', fontSize: '1rem'
                    
                }}
                placeholder="Send a message..."
                onKeyPress={keyPressHanlder}
                type="text"
            />

        </div>
        {/* <ThemeProvider style={{backgroundColor: 'white'}}>
            <div style={{ height: 594, width: '100%', overflow: 'auto' }}>
                <div className="timestamp">
                    {nowTime}
                </div>
                {renderMessage(messagesFromRedux)}

                <div ref={messagesEndRef} />
            </div >
            <input
                style={{
                    margin: 0, width: '100%', height: '10%',
                    borderRadius: '4px', padding: '5px', fontSize: '1rem'
                    
                }}
                placeholder="Send a message..."
                onKeyPress={keyPressHanlder}
                type="text"
            />
        </ThemeProvider> */}
        </>
    )
}
Chatbot.propTypes = {
    visible: PropTypes.bool,
  };

Modal.defaultProps = {
    visible: false,
    closable: true,
    maskClosable: true,
}

export default Chatbot;
