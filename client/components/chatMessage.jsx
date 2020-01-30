import React from 'react';
import io from 'socket.io-client';

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
  let roomId;
  if (props.userId < props.activeChat) roomId = (props.userId).toString() + props.activeChat;
  else roomId = (props.activeChat).toString() + props.userId;

  const socket = io.connect('/chat');
  socket.emit('subscribe', roomId);
  React.useEffect(
    () => {
      socket.emit('send message', {
        room: roomId,
        message: message.message,
        counter: message.counter,
        user: props.userId
      });
      // return () => socket.off('conversation private post', data => console.log('off', data));
    }, [message.counter]
  );
  socket.on('conversation private post', data => {
    // console.log(socket.id);
    if (data.user === props.activeChat) {
      if (data.counter !== otherMessage.counter) {
        // console.log(data.message);
        setOtherMessage({
          message: data.message,
          counter: data.counter
        });
      }
    }
  });

  return (
    <div>
      <div></div>
      <div>
        <div className="input-group">
          <input type="text" onChange={e => setTempMessage(e.target.value)}/>
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-paper-plane cursor-pointer" onClick={
                () => {
                  const tempCounter = message.counter + 1;
                  setMessage({
                    message: tempMessage,
                    counter: tempCounter
                  });
                }
              }></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
