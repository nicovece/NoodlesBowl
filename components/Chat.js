import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
  const { name, color, colorLabel } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={{ backgroundColor: '#fff' }}>
        <Text style={[styles.helloText, { color: color }]}>Hello {name}!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  helloText: {
    padding: 20,
    fontSize: 45,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default Chat;
