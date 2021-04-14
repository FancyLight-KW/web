import React from 'react';
import './Compose.css';
import '../MessageList'
export default function Compose(props) {
  const keyPressHanlder = (e) => {
    if (e.key === "Enter") {

        if (!e.target.value) {
            return alert('you need to type somthing first')
        }

        //we will send request to text query route 
        //textQuery(e.target.value)


        e.target.value = "";
    }
}
    return (
      <div className="compose">
        <input
          type="text"
          className="compose-input"
          placeholder="Type a message, @name">
            onKeyPress={keyPressHanlder}
          </input>

        {
          props.rightItems
        }
      </div>
    );
}