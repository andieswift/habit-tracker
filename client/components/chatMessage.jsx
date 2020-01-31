import React from 'react';
import ChatMessageItem from './chatMessageItem';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';

const ChatMessage = props => {
  const [tempMessage, setTempMessage] = React.useState('');
  const [message, setMessage] = React.useState({
    message: '',
    counter: 0
  });
  const [otherMessage, setOtherMessage] = React.useState({
    message: '',
    counter: 0
  });
  const location = useLocation();
  let roomId;
  if (props.userId < props.activeChat) roomId = (props.userId).toString() + props.activeChat;
  else roomId = (props.activeChat).toString() + props.userId;
  const [messageHistory, setMessageHistory] = React.useState([]);
  const socket = io.connect('/chat');
  React.useEffect(
    () => {
      socket.emit('send message', {
        room: roomId,
        message: message.message,
        counter: message.counter,
        user: props.userId
      });
    }, [message.counter]
  );
  socket.on('conversation private post', data => {
    if (data.user === props.activeChat) {
      if (data.counter !== otherMessage.counter) {
        if (data.message) {
          setOtherMessage({
            message: data.message,
            counter: data.counter
          });
          setMessageHistory(
            () => {
              const mhCopy = [...messageHistory];
              mhCopy.push({
                senderId: props.activeChat,
                receiverId: props.userId,
                message: data.message
              });
              return mhCopy;
            }
          );
        //   const init = {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //       user: props.userId,
        //       message: data.message
        //     })
        //   };
        //   fetch(`/api/chat/${props.activeChat}`, init)
        //     .then(res => res.json())
        //     .then(res => false);
        }
      }
    }
  });

  React.useEffect(
    () => {
      fetch(`/api/chat/${props.userId}/${props.activeChat}`)
        .then(res => res.json())
        .then(res => setMessageHistory(res));
    }, [messageHistory]
  );

  React.useEffect(
    () => {
      socket.emit('subscribe', roomId);
      return () => socket.emit('unsubscribe', roomId);
    }, [location]
  );

  const createMessage = () => {
    if (messageHistory) {
      return messageHistory.map(item => <ChatMessageItem message={item}
        user1={props.userId} user2={props.activeChat} key={item.chatId} />);
    } else return null;
  };

  return (
    <div>
      <div>
        {createMessage()}
      </div>
      <div>
        <div className="card m-2">
          <div className="row card-body text-left">
            <input type="text" className="new-routine col-10" value={tempMessage}
              onChange={e => setTempMessage(e.target.value)} />
            <i className="fas fa-paper-plane cursor-pointer text-secondary col-2 fa-2x"
              onClick={ () => {
                const tempCounter = message.counter + 1;
                setMessage({
                  message: tempMessage,
                  counter: tempCounter
                });
                if (tempMessage) {
                  setMessageHistory(
                    () => {
                      const mhCopy = [...messageHistory];
                      mhCopy.push({
                        senderId: props.userId,
                        receiverId: props.activeChat,
                        message: tempMessage
                      });
                      return mhCopy;
                    }
                  );
                  const init = {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      user: props.activeChat,
                      message: tempMessage
                    })
                  };
                  fetch(`/api/chat/${props.userId}`, init)
                    .then(res => res.json())
                    .then(res => false);
                }
                setTempMessage('');
              }
              }></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
