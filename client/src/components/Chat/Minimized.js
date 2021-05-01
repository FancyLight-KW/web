import * as React from 'react'
import { IconButton, ChatIcon } from '@livechat/ui-kit'
import chatbotimg from "../../assets/Chatbot.png";

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
		<IconButton color="#26a5d0">
			<img src={chatbotimg}
			width="80"
			height="80"></img>
		</IconButton>

	</div>
)

export default Minimized
