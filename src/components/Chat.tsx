import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore';

const Chat = () => {
  const [messages, setMessages]:any= useState([])

    useEffect(() => {
      const subscriber = firestore()
        .collection('chats')
        .doc('8142397931')
        .collection('messages')
        .orderBy('createdAt', 'desc');
      subscriber.onSnapshot(querysnapshot => {
        const allmessages = querysnapshot.docs.map(item => {
          return {...item._data, createdAt: item._data.createdAt};
        });
        setMessages(allmessages);
      });
      //return () => subscriber();
    }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])

  return (
    <View style={{flex:1}}>
      <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({})