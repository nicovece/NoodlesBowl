import { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  SystemMessage,
} from 'react-native-gifted-chat';
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db, storage } from '../firebase';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

const Chat = ({ route, navigation, isConnected }) => {
  const { name, color, colorLabel, colorContrast, uid } = route.params;
  const [messages, setMessages] = useState([]);
  
  const unsubMessages = useRef(null);

  useEffect(() => {
    navigation.setOptions({ title: name });

    if (isConnected === true) {
      // Unsubscribe from previous messages
      if (unsubMessages.current) unsubMessages.current();
      unsubMessages.current = null;

      // Subscribe to new messages
      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
      unsubMessages.current = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            _id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cachedMessages(newMessages);
        setMessages(newMessages);
      });
    } else {
      loadCachedMessages();
    }

    // Cleanup function
    return () => {
      if (unsubMessages.current) unsubMessages.current();
    };
  }, [isConnected]);

  // Cache messages to AsyncStorage
  const cachedMessages = async (newMessages) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(newMessages));
    } catch (error) {
      console.error('Error saving messages to AsyncStorage:', error);
    }
  };

  // Load cached messages from AsyncStorage
  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem('messages')) || '[]';
    setMessages(JSON.parse(cachedMessages));
  };

  const onSend = async (newMessages) => {
    try {
      await addDoc(collection(db, 'messages'), newMessages[0]);
      console.log('Message sent to Firestore successfully!');
    } catch (error) {
      console.error('Error sending message to Firestore:', error);
    }
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000',
          },
          left: {
            backgroundColor: '#FFF',
          },
        }}
      />
    );
  };

  const renderSystemMessage = (props) => {
    return (
      <SystemMessage
        {...props}
        containerStyle={[
          styles.systemMessageContainer,
          { backgroundColor: color },
        ]}
        textStyle={[styles.systemMessageText, { color: colorContrast }]}
      />
    );
  };

  const renderCustomActions = (props) => {
    return <CustomActions 
      {...props} 
      onSend={onSend} 
      user={{ _id: uid, name: name }} 
      storage={storage}
    />;
  };

  const renderCustomView = (props) => {
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
          <MapView
            style={{width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            accessible={true}
            accessibilityLabel={`Shared location map${currentMessage.user && currentMessage.user.name ? ' from ' + currentMessage.user.name : ''}`}
          />
      );
    }
    return null;
  };

  const conditionalInputToolbar = (props) =>
    isConnected ? <InputToolbar {...props} /> : null;

  return (
    <ImageBackground
      source={require('../assets/chat_bg-blur.webp')}
      resizeMode='cover'
      style={[styles.backgroundMain, { backgroundColor: color }]}
      imageStyle={{ opacity: 0.25 }}
      accessible={true}
      accessibilityLabel='Chat background image'
    >
      <GiftedChat
        accessible={true}
        accessibilityLabel='Chat area. Double tap a message to hear its content. Use the plus button to send media or location.'
        style={[styles.container, { backgroundColor: color }]}
        messages={messages}
        renderBubble={renderBubble}
        renderSystemMessage={renderSystemMessage}
        renderInputToolbar={conditionalInputToolbar}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: uid,
          name: name,
        }}
      />
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behavior='height' />
      ) : null}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundMain: {
    flex: 1,
  },
  systemMessageContainer: {
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    // backgroundColor: '#f0f0f0',
    borderRadius: 12,
    alignSelf: 'center',
    maxWidth: '80%',
  },
  systemMessageText: {
    // color: '#888',
    // fontStyle: 'italic',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Chat;
