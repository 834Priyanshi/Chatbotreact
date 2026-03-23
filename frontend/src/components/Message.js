import React from "react";

function Message({ msg }) {
  return (
    <div className={`message ${msg.sender}`}>
      <p>{msg.text}</p>
    </div>
  );
}

export default Message;