import React from 'react';
import ChatUserItem from './chatUserItem';

const ChatUserList = props => {
  const [name, setName] = React.useState('');
  const [search, setSearch] = React.useState(false);
  const [userList, setUserList] = React.useState([]);
  const createChatList = () => {
    if (search) {
      return userList.map(item => <ChatUserItem key={item}
        user1={props.userId} user2={item.userId} setView={props.setView}
        setActiveChat={props.setActiveChat} />);
    } else if (props.chatUser.length) {
      return props.chatUser.map(item => <ChatUserItem key={item}
        user1={props.userId} user2={item} setView={props.setView}
        setActiveChat={props.setActiveChat} />);
    }
  };

  return (
    <div className="container">
      <div className="card m-2">
        <div className="row card-body text-left">
          <input type="text" className="new-routine col-10"
            placeholder='search user name' value={name} onChange={
              e => setName(e.target.value)
            } />
          <i className="fas fa-search cursor-pointer text-secondary col-2 fa-2x" onClick={
            () => {
              fetch(`/api/name/${name}`)
                .then(res => res.json())
                .then(res => {
                  if (res.length) {
                    setUserList(res);
                    setSearch(true);
                  }
                });
            }
          }></i>
        </div>
      </div>
      {createChatList()}
    </div>
  );
};

export default ChatUserList;
