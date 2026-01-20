import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { auth, firestore } from '../firebase';

const MessagesScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const user = auth().currentUser;
    firestore().collection('messages').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
      const data = snapshot.docs.map(doc => ({ ...doc.data(), createdAt: doc.data().createdAt.toDate() }));
      setMessages(data);
    });
  }, []);

  const onSend = (newMessages = []) => {
    firestore().collection('messages').add({
      ...newMessages[0],
      user: { _id: auth().currentUser.uid, name: 'User' },
      createdAt: new Date(),
    });
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{ _id: auth().currentUser.uid }}
    />
  );
};

export default MessagesScreen;
