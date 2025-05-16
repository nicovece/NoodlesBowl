import { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Send, SystemMessage } from 'react-native-gifted-chat';

const Chat = ({ route, navigation }) => {
  const { name, color, colorLabel } = route.params;
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
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  }

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat 
        style={[styles.container, { backgroundColor: color }]}
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1
        }}
      />
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;

// import { useEffect } from 'react';
// import { StyleSheet, View, Text } from 'react-native';

// const Chat = ({ route, navigation }) => {
//   const { name, color, colorLabel } = route.params;

//   useEffect(() => {
//     navigation.setOptions({ title: name });
//   }, []);

//   return (
//     <View style={[styles.container, { backgroundColor: color }]}>
//       <View style={{ backgroundColor: '#fff' }}>
//         <Text style={[styles.helloText, { color: color }]}>Hello {name}!</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   helloText: {
//     padding: 20,
//     fontSize: 45,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   }
// });

// export default Chat;
