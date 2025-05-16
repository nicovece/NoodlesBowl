import { useState, useEffect } from 'react';
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

const Chat = ({ route, navigation }) => {
  const { name, color, colorLabel, colorContrast } = route.params;
  const [messages, setMessages] = useState([]);
  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'This is a system message!',
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

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

  // const customInputToolbar = (props) => {
  //   return (
  //     <InputToolbar
  //       {...props}
  //       containerStyle={{
  //         backgroundColor: 'white',
  //         borderTopColor: color,
  //         borderTopWidth: 4,
  //       }}
  //     />
  //   );
  // };

  return (
    <ImageBackground
      source={require('../assets/chat_bg-blur.webp')}
      resizeMode='cover'
      style={[styles.backgroundMain, { backgroundColor: color }]}
      imageStyle={{ opacity: 0.25 }}
      accessibile={true}
      accessibilityLabel='Chat Container'
    >
      <GiftedChat
        accessibile={true}
        accessibilityLabel='Chat'
        style={[styles.container, { backgroundColor: color }]}
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
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
});

export default Chat;
