import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import RoomAndUsersColumn from './room-and-users';
import SendMessage from './send-message';
import MessagesReceived from './messages';

const Chat = ({ username, room, socket }) => {
  const [messagesReceived, setMessagesReceived] = useState([]);
  const messagesColumnRef = useRef(null);

  useEffect(() => {
    const handleNewMessage = (data) => {
      setMessagesReceived((prevMessages) => [
        ...prevMessages,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    };

    socket.on('receive_message', handleNewMessage);

    return () => socket.off('receive_message', handleNewMessage);
  }, [socket]);

  useEffect(() => {
    const handleLast100Messages = (last100Messages) => {
      last100Messages = JSON.parse(last100Messages);
      last100Messages = sortMessagesByDate(last100Messages);
      setMessagesReceived((prevMessages) => [...last100Messages, ...prevMessages]);
    };

    socket.on('last_100_messages', handleLast100Messages);

    return () => socket.off('last_100_messages', handleLast100Messages);
  }, [socket]);

  useEffect(() => {
    messagesColumnRef.current.scrollTop = messagesColumnRef.current.scrollHeight;
  }, [messagesReceived]);

  const sortMessagesByDate = (messages) => {
    return messages.sort(
      (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
    );
  };
  const formatDateFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className={styles.chatContainer}>
      <RoomAndUsersColumn socket={socket} username={username} room={room} />

      <div>
        <MessagesReceived
          messages={messagesReceived}
          messagesColumnRef={messagesColumnRef}
          formatDateFromTimestamp={formatDateFromTimestamp}
        />
        <SendMessage socket={socket} username={username} room={room} />
      </div>
    </div>
  );
};

export default Chat;

