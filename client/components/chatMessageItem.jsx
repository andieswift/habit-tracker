import React from 'react';

const ChatMessageItem = props => {
  const createSenderMessage = () => {
    if (props.message.senderId === props.user2) {
      return (
        <div className="card m-2 col-12">
          <div className="card-body text-left" >
            <p>{props.message.message}</p>
          </div>
        </div>
      );
    }
  };

  const createReceiverMessage = () => {
    if (props.message.senderId === props.user1) {
      return (
        <div className="card m-2 col-12">
          <div className="card-body text-right" >
            <p>{props.message.message}</p>
          </div >
        </div>
      );
    }
  };

  return (
    <>
      <div className='container'>
        {createSenderMessage()}
      </div>
      <div className='container'>
        {createReceiverMessage()}
      </div>
    </>
  );
};

export default ChatMessageItem;
