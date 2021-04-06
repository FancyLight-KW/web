import React, { useEffect, useRef } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../actions/message_actions';
import Message_local from './Sections/Message';
import { List, Avatar } from 'antd';
import { RobotOutlined } from '@ant-design/icons'
import cookie from "react-cookies";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css"
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from "@chatscope/chat-ui-kit-react"
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
            //return <Message_local key={i} who={message.who} text={message.content.text.text} />
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


    return (
        <div style={{
            height: 700, width: 700,
            border: '3px solid black', borderRadius: '7px'
        }}>
            <div
                style={{ height: 644, width: '100%', overflow: 'auto' }}>


                {renderMessage(messagesFromRedux)}
                
                <div ref = {messagesEndRef}/>
            </div>
            {/* <div style={{ position: "relative", height: "500px" }}>
                
                <MainContainer>
                    <ChatContainer>
                        
                        <MessageInput placeholder="Type message here">
                            onKeyPress={keyPressHanlder}
                        </MessageInput>
                    </ChatContainer>
                </MainContainer>
            </div> */}
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
    )
}

export default Chatbot;
