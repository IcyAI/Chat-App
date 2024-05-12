//import components from react-native
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';

//import from react
import { useState, useEffect } from "react";

//import Gifted Chat
import { Bubble, GiftedChat } from "react-native-gifted-chat";

//create navigation from start page with props
const Chat = ({ route, navigation }) => {

  //Create Message State
  const [messages, setMessages] = useState([]);


//set message to static message
useEffect(() => {
  setMessages([
    {
      _id: 1,
      text: 'Hello developer',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
    {
      _id: 2,
      text: 'This is a system message',
      createdAt: new Date(),
      system: true,
    },
  ]);
}, []);

const onSend = (newMessages) => {
  setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
}

  const { name, backgroundColor } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []); //the empty dependency array means this will only be mounted once, ie when user enters their username

  //Renderbubble function
  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000",
        },
        left: {
          backgroundColor: "#FFF",
        }
      }}
    />
  }

  //page content
  return (
    <View style={[styles.container,{backgroundColor: backgroundColor}]}>
      <GiftedChat 
        renderAvatar={() => null}
        renderBubble={renderBubble}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1
        }}
      />
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
      { Platform.OS === "ios"?<KeyboardAvoidingView behavior="padding" />: null}
    </View>
  );
}

//page styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    margin: 0,
  },
  ChatText: {
    width: '100%',
  }
});

export default Chat;