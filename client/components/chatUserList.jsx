import React from 'react';
import ChatUserItem from './chatUserItem';

const ChatUserList = props => {
  const createChatList = () => {
    if (props.chatUser.length) {
      return props.chatUser.map(item => <ChatUserItem key={item}
        user1={props.userId} user2={item} setView={props.setView}
        setActiveChat={props.setActiveChat} />);
    }
  };

  return (
    <div className="container">
      <div className="input-group row">
        <div className="input-group-prepend cursor-pointer">
          <div className="input-group-text">
            <i className="fas fa-search"></i>
          </div>
        </div>
        <input type="text" />
      </div>
      {createChatList()}
    </div>
  );
};

export default ChatUserList;
