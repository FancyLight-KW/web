import React, { useEffect } from "react";
import axios from "axios";
import Chatbot from './Chatbot/Chatbot';
// test proxy
const Testpage = () => {
  useEffect(() => {
    axios.get("/users/1").then((response) => console.log(response));
  }, []);

  return (
    <div>
      <Chatbot />

    </div>
  );
};

export default Testpage;
