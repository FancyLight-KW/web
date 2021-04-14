import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';
import React, { useEffect, useRef } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../../actions/message_actions';
import Message_local from '../Sections/Message';
import { List, Avatar } from 'antd';
import { RobotOutlined } from '@ant-design/icons'
import cookie from "react-cookies";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router";

export default function Messenger(props) {
    return (
      <div className="messenger">
        {/* <Toolbar
          title="Messenger"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-ios-cog" />
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        /> */}

        {/* <Toolbar
          title="Conversation Title"
          rightItems={[
            <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
            <ToolbarButton key="video" icon="ion-ios-videocam" />,
            <ToolbarButton key="phone" icon="ion-ios-call" />
          ]}
        /> */}

        {/* <div className="scrollable sidebar">
          {<ConversationList />}
        </div> */}

        <div className="scrollable content">
          <MessageList />
        </div>
      </div>
    );
}