import React from "react";

const Message = props => (
  <div>
    {props.error && <p>{props.error}</p>}
  </div>
);

export default Message;
