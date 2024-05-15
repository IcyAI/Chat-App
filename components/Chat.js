//import components from react-native
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';

//import from react
import { useState, useEffect } from "react";

//import Gifted Chat
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";

//import firestone
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

//import from react native async storage
import AsyncStorage from "@react-native-async-storage/async-storage";

//create navigation from start page with props
const Chat = ({ route, navigation, db, isConnected }) => {

  //Create Message State
  const [messages, setMessages] = useState([]);

  //pass on user params from app.js
  const { name, backgroundColor, id } = route.params;

  
//set message to dynamic message

  //declared & initialized here to avoid it being accessible only within the scope of the if block
  let unsubMessages;

useEffect(() => {
// unregister current onSnapshot() listener to avoid registering multiple listeners when useEffect code is re-executed
if (unsubMessages) unsubMessages();

if (isConnected === true) {
  const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
  //the onSnapshot() function listens for updates inside the collection
  unsubMessages = onSnapshot(q, (docs) => {
    let newMessages = [];
    docs.forEach(doc => {
      newMessages.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis()) })
    });
    //cacheing messages here while the useEffect() callback function is updating the messages array
    cacheMessages(newMessages);
    setMessages(newMessages);
  });

} else loadCachedMessages();

  return () => {
    if (unsubMessages) unsubMessages();
  }

}, [isConnected]);

const cacheMessages = async (messagesToCache) => {
  try {
    await AsyncStorage.setItem("message_cache", JSON.stringify(messagesToCache));
  } catch (error) {
    console.log(error.message);
  }
}

const loadCachedMessages = async () => {
  const messageCache = await AsyncStorage.getItem("message_cache") || [];
  setMessages(JSON.parse(messageCache));
}

const onSend = (newMessages) => {
     //the message to be sent/added is the 1st item inside the newMessages array
     addDoc(collection(db, "messages"), newMessages[0]);
}

const renderInputToolbar = (props) => {
  if (isConnected) return <InputToolbar {...props} />;
  else return null;
}

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
        renderInputToolbar={renderInputToolbar}
        onSend={messages => onSend(messages)}
        user={{
          _id: id,
          name
        }}
      />
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
      {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="height" />: null}
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