import React from 'react';
import Header from './header';
import Sidebar from './sidebar';

const Chat = props => {
  const isSideBarOpen = () => {
    if (props.isOpen) {
      return <Sidebar sideRender={'requests'} closeSideBar={props.openSideBar} />;
    }
  };

  return (
    <div className="bg-light h-100">
      <Header title={'Chat'} headerView={'main'} openSideBar={props.openSideBar} />
      {isSideBarOpen()}
    </div>
  );
};

export default Chat;
