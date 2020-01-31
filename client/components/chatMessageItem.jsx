import React from 'react';

const ChatMessageItem = props => {
  return (
    <div className="card m-2">
      <div className="row card-body text-left">
        <p>{props.message.message}</p>
      </div>
    </div>
  );
};

export default ChatMessageItem;
