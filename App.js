import React from 'react';
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { LogBox, Alert } from "react-native";

import {
  //getFirestore,
  disableNetwork,
  enableNetwork,
} from 'firebase/firestore';

// Create the navigator
const Stack = createNativeStackNavigator();

// Import your firebase config
  import { db } from './firebase';

const App = () => {
  // const firebaseConfig = {
  //   apiKey: "AIzaSyDtBRG6QvM-b1_u2NI4KHmNGVp_G6BNghU",
  //   authDomain: "noodlesbowl-f7d56.firebaseapp.com",
  //   projectId: "noodlesbowl-f7d56",
  //   storageBucket: "noodlesbowl-f7d56.firebasestorage.app",
  //   messagingSenderId: "1042412426709",
  //   appId: "1:1042412426709:web:c9538c0816a18adc7b595c"
  // };
  
  // // Initialize Firebase
  // const app = initializeApp(firebaseConfig);
  // const db = getFirestore(app);

  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
