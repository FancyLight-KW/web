import React, {Component} from 'react'
import { List, Avatar, Layout, Typography } from 'antd';
//import 'antd/dist/antd.css';
import { RobotOutlined } from '@ant-design/icons'
import { SmileOutlined } from '@ant-design/icons'
import { Table, Row, Col } from "react-bootstrap";
//import "./Message.css"
import './style.css'
import { ThemeProvider } from '@livechat/ui-kit'
import { useHistory } from "react-router";

// import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css"
// import {
//     MainContainer,
//     ChatContainer,
//     MessageList,
//     Message,
//     MessageInput,
// } from "@chatscope/chat-ui-kit-react"
// import context from 'react-bootstrap/esm/AccordionContext';
//import Clock from "react-live-clock"

const { Title }=Typography;
const { Header, Footer, Sider, Content }=Layout;



function Messages(props) {
    let currentTime = new Date();
//<RobotOutlined style={{display:"flex", justifyContent:"flex-start"}} />
//     <StyledLink to={to}>
//      <StyledButton onClick={onClick}>{children}</StyledButton>
//    </StyledLink>

    // const DisplaySrc = props.who ==='bot' ? 
    //     <List.Item.Meta style ={{display:"flex", justifyContent:"flex-start"}}>
    //         avatar={<Avatar icon={RobotOutlined} />}
    //         title={props.who}
    //         description={props.text}
    //     </List.Item.Meta>
    // : <List.Item.Meta style ={{display:"flex", justifyContent:"flex-start"}}>
    //     avatar={<Avatar icon={SmileOutlined} />}
    //     title={props.who}
    //     description={props.text}
    // </List.Item.Meta>

    //const AvatarSrc = props.who ==='bot' ? <RobotOutlined /> : <SmileOutlined />

    //if(props.who == 'bot' && props.text == "요청 페이지로 이동합니다."){

    //}

    const AvatarSrc = props.who ==='bot' ? <Avatar src={RobotOutlined}/> : <Avatar src={SmileOutlined}/> 
    const PositionSrc = props.who ==='bot' ? "flex-start" : "flex-end"
    const SenderSrc = props.who ==='bot' ? "bot" : ""
    //const MessageSrc = props.who ==='bot' ? <Icon type="robot" /> : <Icon type="smile" />  
    
    //const nowTime = Moment().format('HH:mm');
    return (
        <div className="messageCard">
            {props.who === 'bot' ? (
                <div>                  
                    <div >
                    <RobotOutlined style={{padding:'10px', paddingLeft:'1rem'}}></RobotOutlined>
                        <p className="botCard"
                            style={{
                                paddingLeft: "16px",
                                paddingRight: "10px",
                                fontFamily: "Montserrat",
                                paddingTop: "10px",
                                paddingBottom: "10px",
                                fontWeight: 700,
                                //innerWidth: "50px"
                            }}
                        >
                            {props.text}
   
                        </p>
                    </div>
                </div>
            ) : (  
                <div>
                    {/* <div>
                        <Avatar style={{ display: "flex", padding: "1rem", justifyContent:'flex-end' }} ><SmileOutlined /></Avatar>
                    </div> */}
                <div className="userCard">
                    
                    <p
                        style={{
                            paddingLeft: "16px",
                            paddingRight: "10px",
                            paddingTop: "10px",
                            fontFamily: "Montserrat",
                            fontWeight: 700
                        }}
                    >
                        {props.text}
                    </p>
                </div>
                </div>
      )}
    </div>
        /*
        (props.who === 'bot') ? (
            <Layout style={{justifyContent:"flex-start"}}>
                <Header Style={{padding:1}}>
                    <Avatar style ={{display:"flex", padding: '1rem'}} />
                    <Title style={{color:'#f56a00', float:"left"}} level={3}> <RobotOutlined/> </Title>
                </Header>
                <Layout>
                    <Sider>{props.who}</Sider>
                    <Footer>{props.text}</Footer>
                </Layout>
            </Layout>
        ):(
            <Layout style={{float:"right"}}>
                <Header Style={{padding:1}}>
                    <Avatar style ={{display:"flex", padding: '1rem'}} />
                    <Title style={{color:'#f56a00'}} level={3}> <SmileOutlined/> </Title>
                </Header>
                <Layout>
                    <Sider>{props.who}</Sider>
                    <Content>{props.text}</Content>
                </Layout>
            </Layout>
        )
        */
        
        //avater={<Avatar style={{color:'#f56a00'}}><RobotOutlined/> </Avatar>}
        // <th style={{bottom:"1"}}>
        //         {currentTime.toLocaleTimeString()}
        //     </th>


        /*
        //(props.who === 'bot') ? (
            <div style={{ position: "relative", height: "500px", justifyContent: {PositionSrc} }}>
                <MainContainer>
                    <ChatContainer>
                        <MessageList>
                        <Message
                            model={{
                                message: props.text,
                                sentTime: "just now",
                                sender: props.who,
                            }}
                        >
                            avatar={<Avatar icon={AvatarSrc}/>}
                            <Message.Header sender={SenderSrc} sentTime="just now" />
                        </Message>
                        </MessageList>
                    </ChatContainer>
                </MainContainer>
            </div>
            */
       /* ) : (
            <div style={{ position: "relative", height: "500px" }}>
                <MainContainer>
                    <ChatContainer>
                        <MessageList>
                        <Message
                            style={{ justifyContent: "flex-end" }}
                            model={{
                                message: `${props.text}`,
                                sentTime: "just now",
                                sender: `${props.who}`,
                            }}
                        />
                        </MessageList>
                    </ChatContainer>
                </MainContainer>
            </div>
        )
        */
////////////////////////////////////////////
/*
        (props.who === 'bot') ? (
            
            <div class="arrow_box">
            <Layout>
            <List.Item style ={{display:"flex", justifyContent:"flex-start", padding: '1rem', paddingRight:'2rem'}}>
            <List.Item.Meta 
                
                title={<RobotOutlined/>}
                description={props.text}
                //description={props.text + <Clock format={'HH:mm'} timezone={'US/pacific'}/>}
                
            />
            <p style={{bottom:"150px"}}>{currentTime.toLocaleTimeString()}</p>
            </List.Item> 
            </Layout>
            </div>
            
        )
    : ( 
        
        <List.Item style ={{display:"flex", justifyContent:"flex-end", padding: '1rem'}}>
        <p style={{bottom:"150px"}}>{currentTime.toLocaleTimeString()}</p>
        <div class="arrow_box">
        <List.Item.Meta style ={{justifyContent:"flex-end"}}
            //avater={<Avatar icon={<SmileOutlined/>} />}
            //title={props.who, <SmileOutlined/>}
            description={props.text}
        />
        </div>
    </List.Item> 
    )
    */
////////////////////////////////////////
    /*
    (props.who === 'bot') ? (
        <Row>
            <Col>
                <Title style={{color:'#f56a00'}} level={3}> <RobotOutlined/> </Title>
                <Sider>{props.who}</Sider>
                <Content>{props.text}</Content>
            </Col>
        </Row>
    ): (
        <Row style={{justifyContent:"flex-end"}}>
        <Col>
            <Title style={{color:'#f56a00'}} level={3}> <SmileOutlined/> </Title>
            <Sider>{props.who}</Sider>
            <Content>{props.text}</Content>
        </Col>
    </Row>
    )
    */
    )
}

export default Messages
