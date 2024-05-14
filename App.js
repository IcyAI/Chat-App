//import React-native component
import { StyleSheet, Text, View } from 'react-native';

// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

//import firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();


const firebaseConfig = {
  apiKey: "AIzaSyCqGTI4KHeLpSPFC-aHAmv30oxBU-qCens",
  authDomain: "chatapp-a1dd0.firebaseapp.com",
  projectId: "chatapp-a1dd0",
  storageBucket: "chatapp-a1dd0.appspot.com",
  messagingSenderId: "306168821357",
  appId: "1:306168821357:web:355708a6593333d953f164"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

const db = getFirestore(app);

//create app
const App = () => {
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
          {props => <Chat db={db} {...props} />}
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
