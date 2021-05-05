import * as React from 'react'
import { IconButton, ChatIcon } from '@livechat/ui-kit'
import chatbotimg from "../../assets/Chatbot.png";
import styled from "styled-components";
const HoverImage = styled.div`
  &:hover {
    opacity: 0.8;
  }
`;
const Minimized = ({ maximize }) => (
	<div
		onClick={maximize}
		style={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: '60px',
			height: '60px',
			color: '#fff',
			borderRadius: '50%',
			cursor: 'pointer',
		}}
	>
		<HoverImage>
			<img src={chatbotimg}
			width="80"
			height="80"></img>
		
		</HoverImage>
	</div>
)

export default Minimized
