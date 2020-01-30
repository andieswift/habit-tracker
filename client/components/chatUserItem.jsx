import React from 'react';

const ChatUserItem = props => {
  const [name, setName] = React.useState('');

  React.useEffect(
    () => {
      fetch(`/api/chat/name/${props.user2}`)
        .then(res => res.json())
        .then(res => setName(res.userName));
    }, []
  );

  return (
    <div className="card m-2" onClick={() => {
      props.setView('chat');
      props.setActiveChat(props.user2);
    }}>
      <div className="row card-body text-left">
        <h2 className="text-secondary">{name}</h2>
      </div>
    </div>
  );
};

export default ChatUserItem;
