//import from react
import { useEffect } from "react";

//import React-native component
import { StyleSheet, Text, View, Alert } from 'react-native';

// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

//import firebase
import { initializeApp } from "firebase/app";
import { getFirestore, enableNetwork, disableNetwork } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

//import from ReactNativesafestorage
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'; //refer to comments from line 25

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import from netinfo
import { useNetInfo } from '@react-native-community/netinfo';

//.env file
import { REACT_APP_API_KEY } from '@env';

// Create the navigator
const Stack = createNativeStackNavigator();

//create app
const App = () => {

  //determine if App is connected or not
  const connectionStatus = useNetInfo();


  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "chatapp-a1dd0.firebaseapp.com",
    projectId: "chatapp-a1dd0",
    storageBucket: "chatapp-a1dd0.appspot.com",
    messagingSenderId: "306168821357",
    appId: "1:306168821357:web:355708a6593333d953f164"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  const db = getFirestore(app);

  return (
    //Build Navigation
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
       <Stack.Screen
          name='Chat'
          >
            {props => <Chat db={db} {...props}
            isConnected={connectionStatus.isConnected}
          />
          }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
//style Navigation
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
