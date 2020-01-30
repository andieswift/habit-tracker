import React from 'react';
import Header from './header';
import Sidebar from './sidebar';
import ChatUserList from './chatUserList';
import UserContext from './userContext';
import ChatMessage from './chatMessage';

const Chat = props => {
  const userId = React.useContext(UserContext).userId;
  const [chatUser, setChatUser] = React.useState([]);
  const [view, setView] = React.useState('main');
  const [activeChat, setActiveChat] = React.useState(null);

  const isSideBarOpen = () => {
    if (props.isOpen) {
      return <Sidebar sideRender={'requests'} closeSideBar={props.openSideBar} />;
    }
  };

  React.useEffect(
    () => {
      fetch(`/api/chat/id/${userId}`)
        .then(res => res.json())
        .then(res => {
          const userList = new Set(Object.values(res));
          const arr = [];
          userList.forEach(item => arr.push(item));
          setChatUser(arr);
        });
    }, [chatUser.length]
  );

  const createPage = () => {
    if (view === 'main') {
      return <ChatUserList userId={userId} chatUser={chatUser} setView={setView}
        setActiveChat={setActiveChat} />;
    } else return <ChatMessage userId={userId} activeChat={activeChat} />;
  };

  return (
    <div className="bg-light h-100">
      <Header title={'Chat'} headerView={'main'} openSideBar={props.openSideBar} />
      {isSideBarOpen()}
      {createPage()}
    </div>
  );
};

export default Chat;
