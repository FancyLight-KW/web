import React, {useRef, useState} from "react";
import { Typography, Modal, Button } from 'antd';
import { RobotOutlined } from '@ant-design/icons'
import Chatbot from './Chatbot/Chatbot';
const { Title } = Typography;

// test proxy
// const Testpage = () => {
//   useEffect(() => {
//     axios.get("/users/1").then((response) => console.log(response));
//   }, []);

//   return (
//     <div>
//       <h2>테스트페이지</h2>
//     </div>
//   );
// };
function Testpage() {
  return (
    <>
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <Title level={5} >TRANSYS BOT&nbsp;<RobotOutlined type="robot" /></Title>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
       
        <Chatbot />

      </div>
    </div>
    </>
  ) 
}
export default Testpage
//export default Testpage;
