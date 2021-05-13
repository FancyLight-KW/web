import React, { useEffect, useRef } from 'react'
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../../actions/message_actions';
import cookie from "react-cookies";
import { useHistory } from "react-router";
import Message_local from '../../Chatbot/Sections/Message'
import { RobotOutlined } from '@ant-design/icons'
import '../../Chatbot/index/Compose.css'
import {
	Avatar,
	TitleBar,
	TextInput,
	MessageList,
	Message,
	MessageText,
	AgentBar,
	Title,
	Subtitle,
	MessageGroup,
	MessageButtons,
	MessageButton,
	MessageTitle,
	MessageMedia,
	TextComposer,
	Row,
	Fill,
	Fit,
	IconButton,
	SendButton,
	EmojiIcon,
	CloseIcon,
	Column,
	RateGoodIcon,
	RateBadIcon,
	Bubble,
	QuickReplies,
	SendIcon,
} from '@livechat/ui-kit'

const getAvatarForUser = (userId, users) => {
	const foundUser = users[userId]
	if (foundUser && foundUser.avatarUrl) {
		return foundUser.avatarUrl
	}
	return null
}

const parseUrl = (url) => url && 'https://' + url.replace(/^(http(s)?\:\/\/)/, '').replace(/^\/\//, '')

const Maximized = ({
	chatState,
	events,
	onMessageSend,
	users,
	ownId,
	currentAgent,
	minimize,
	maximizeChatWidget,
	sendMessage,
	rateGood,
	rateBad,
	rate,
}) => {
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
            },
			own: true,
			timestamp: Date.now(),
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
			console.log(response.data.fulfillmentText);
            for (let content of response.data.fulfillmentMessages) {

                conversation = {
                    who: 'bot',
                    content: content,
					own: true,
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
				own: null,

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
					own: true,
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
	const keyClickHanlder = (e) => {

		if (!e.target.value) {
			return alert('you need to type somthing first')
		}

		//we will send request to text query route 
		textQuery(e.target.value)


		e.target.value = "";

    }
    // const renderCards = (cards) => {
    //     return cards.map((card,i) => <Card key={i} cardInfo={card.structValue} />)
    // }

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }



    useEffect(() => {
        scrollToBottom()
      });

	const today = new Date();   

	let year = today.getFullYear(); // 년도
	let month = today.getMonth() + 1;  // 월
	let date = today.getDate();  // 날짜
	let day = today.getDay();  // 요일
	let hour = today.getHours();
	let minute = today.getMinutes();
	
	let writeTimeStmap = year + '년 ' + month + '월 ' + date + '일 ' + '오전 '+  hour + ':' + minute;
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
			}}
		>
			<TitleBar
				rightIcons={[
					<IconButton key="close" onClick={minimize}>
						<CloseIcon />
					</IconButton>,
				]}
				title="Welcome to ITSP Chat"
			/>
				<AgentBar>
					<Row flexFill>
						<Column flexFit>
							{chatState === 'CHATTING' &&
								<Row>
									<IconButton onClick={ rateGood }>
										<RateGoodIcon style={{
											opacity: rate === 'good' ? '1' : '0.5'
										}} />
									</IconButton>
									<IconButton onClick={ rateBad }>
										<RateBadIcon style={{
											opacity: rate === 'bad' ? '1' : '0.5'
										}} />
									</IconButton>
								</Row>
							}
						</Column>
					</Row>
				</AgentBar>
			<div
				style={{
					flexGrow: 1,
					minHeight: 0,
					height: '100%',
				}}
			>
				
				<MessageList active containScrollInSubtree>
					<div style={{textAlign:'center'}}>{writeTimeStmap}</div>
					{messagesFromRedux.map((message, i) => (
						<>
						<MessageGroup key={i} onlyFirstWithMeta>
							{/* <Message authorName="jon" date={message.parsedDate}>

							</Message> */}
							<Message_local key={i} who={message.who} text={message.content.text.text} moment={message.moment} />
							
							
						</MessageGroup>
						</>
					))}
				</MessageList>
			</div>
			<TextComposer  >
				<Row align="center">
					<Fill>
						<input onKeyPress={keyPressHanlder} placeholder="요청사항을 입력하세요." style={{width: '100%',borderRadius: '5px',
					border: '3px solid lightgray'}} />
					</Fill>
					<Fit>
						<IconButton onClick={keyClickHanlder}>
							<SendIcon color="#4788ef"/>
						</IconButton>
					</Fit>
				</Row>
			</TextComposer>
			<div
				style={{
					textAlign: 'center',
					fontSize: '.6em',
					padding: '.4em',
					background: '#fff',
					color: '#888',
				}}
			>
				{'Powered by ITSP Chat'}
			</div>
		</div>
	)
}

export default Maximized
