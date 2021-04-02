import React, {Component} from 'react'
import { List, Avatar, Layout, Typography } from 'antd';
//import 'antd/dist/antd.css';
import { RobotOutlined } from '@ant-design/icons'
import { SmileOutlined } from '@ant-design/icons'
import { Table, Row, Col } from "react-bootstrap";
import "./Message.css"
//import Clock from "react-live-clock"

const { Title }=Typography;
const { Header, Footer, Sider, Content }=Layout;



function Message(props) {
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

    
    return (
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
    : ( <List.Item style ={{display:"flex", justifyContent:"flex-end", padding: '1rem'}}>
        <th style={{bottom:0}}>
                {currentTime.toLocaleTimeString()}
            </th>
        <List.Item.Meta style ={{justifyContent:"flex-end", backgroundColor: '#f56a00'}}
            //avater={<Avatar icon={<SmileOutlined/>} />}
            //title={props.who, <SmileOutlined/>}
            description={props.text}
        />
    </List.Item> )

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

export default Message
