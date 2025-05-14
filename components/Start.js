import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Image,
  Alert,
  Pressable,
} from 'react-native';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState();
  const [selectedColorLabel, setSelectedColorLabel] = useState();
  const colorOptions = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];
  const colorLabels = ['Black', 'Purple', 'Blue', 'Green'];

  return (
    <ImageBackground
      source={require('../assets/noodlesbowl_bg.png')}
      resizeMode='cover'
      style={[styles.backgroundMain, { backgroundColor: '#090C08' }]}
      imageStyle={{ opacity: 0.5 }}
    >
      <View style={styles.introContainer}>
        <Text style={styles.title}>NoodlesBowl</Text>
        <Text style={styles.subtitle}>Chat</Text>
        <Text style={styles.tagline}>The tastiest way to connect</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.textInputContainer}>
          <Image
            source={require('../assets/input_icon.png')}
            style={styles.textInputBackground}
          />
          <TextInput
            style={[styles.textInput, styles.baseText]}
            value={name}
            onChangeText={setName}
            placeholder='Type your username here'
          />
        </View>
        <View style={styles.colorPickerContainer}>
          <Text style={[styles.baseText, styles.colorPickerLabel]}>
            Choose Background Color:
          </Text>
          <View style={styles.colorPicker}>
            {colorOptions.map((color, index) => (
              <TouchableOpacity
                key={`color__option-${index}`}
                activeOpacity={0.8}
                style={[
                  styles.colorOption,
                  { backgroundColor: color },
                  selectedColor === color && {
                    // borderWidth: 2,
                    // borderColor: 'red',
                    outlineWidth: 2,
                    outlineColor: color,
                    outlineOffset: 2,
                  },
                ]}
                onPress={() => {
                  setSelectedColor(color);
                  setSelectedColorLabel(colorLabels[index]);
                }}
              ></TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.actionsContainer}>
          {/* <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => {
              if (name == '' || selectedColor == '') {
                Alert.alert('Please provide a username and pick a color');
              } else {
                navigation.navigate('Chat', {
                  name: name,
                  color: selectedColor,
                  colorLabel: selectedColorLabel,
                })
              }
            }}
          >
            <Text style={[styles.baseText, styles.buttonText]}>
              Start Chatting
            </Text>
          </TouchableOpacity> */}
          <Pressable
          onPress={() => {
            if (name == '' || selectedColor == '') {
              Alert.alert('Please provide a username and pick a color');
            } else {
              navigation.navigate('Chat', {
                name: name,
                color: selectedColor,
                colorLabel: selectedColorLabel,
              })
            }
          }}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#2F2D34' : '#757083',
            },
            styles.button,
          ]}>
          {({pressed}) => (
            <Text style={[styles.baseText, styles.buttonText]}>
              Start Chatting
            </Text>
          )}
        </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundMain: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  introContainer: {
    width: '88%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 40,
    color: '#ffffff',
  },
  tagline: {
    marginTop: 25,
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
  },
  bodyContainer: {
    width: '88%',
    height: '44%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  baseText: {
    fontSize: 16,
    fontWeight: '300',
    borderColor: '#757083',
  },
  textInputContainer: {
    width: '88%',
    height: 54,
    marginTop: '6%',
    position: 'relative',
  },
  textInputBackground: {
    width: 20,
    height: 19,
    position: 'absolute',
    left: 15,
    top: 17,
  },
  textInput: {
    width: '100%%',
    height: 54,
    padding: 15,
    paddingLeft: 45,
    borderWidth: 1,
    borderRadius: 4,
  },
  colorPickerContainer: {
    width: '88%',
    justifyContent: 'start',
    alignItems: 'start',
  },
  colorPicker: {
    flexDirection: 'row',
    justifyContent: 'start',
    gap: 15,
    width: '88%',
    marginTop: '6%',
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  colorLabel: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  actionsContainer: {
    width: '88%',
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '6%',
    borderWidth: 1,
  },
  button: {
    width: '100%',
    height: 54,
    // backgroundColor: '#757083',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default Start;
