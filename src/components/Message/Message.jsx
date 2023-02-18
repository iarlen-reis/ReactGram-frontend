import React from "react";

import "./Message.css";

const Message = ({ message, type }) => {
  return (
    <div className={`message ${type}`}>
      <p className={`${type}`}>{message}</p>
    </div>
  );
};

export default Message;
