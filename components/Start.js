import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Image,
  Alert,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { db, app, auth } from '../firebase';
import { signInAnonymously } from 'firebase/auth';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#F1E420');
  const [selectedColorContrast, setSelectedColorContrast] = useState('#000');
  const [selectedColorLabel, setSelectedColorLabel] = useState();
  const colorOptions = ['#F1E420', '#302E06', '#2097F1', '#7B20F1', '#F17B20'];
  const colorOptionContrast = ['#000', '#fff', '#000', '#fff', '#000'];
  const colorLabels = ['Light', 'Yellow', 'Brown', 'Blue', 'Purple', 'Orange'];

  // const signInUser = () => {
  //   const auth = getAuth(app);
  //   signInAnonymously(auth)
  //     .then((result) => {
  //       navigation.navigate('Chat', {
  //         uid: result.user.uid,
  //         name,
  //         color: selectedColor,
  //         colorLabel: selectedColorLabel,
  //         colorContrast: selectedColorContrast,
  //       });
  //       Alert.alert('Signed in Successfully!');
  //     })
  //     .catch(() => {
  //       Alert.alert('Unable to sign in, try later again.');
  //     });
  // };
  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate('Chat', {
          uid: result.user.uid,
          name,
          color: selectedColor,
          colorLabel: selectedColorLabel,
          colorContrast: selectedColorContrast,
        });
        Alert.alert('Signed in Successfully!');
      })
      .catch((error) => {
        console.log('Sign in error:', error);
        Alert.alert('Unable to sign in, try later again.');
      });
  };

  return (
    <ImageBackground
      source={require('../assets/noodlesbowl_bg.webp')}
      resizeMode='cover'
      style={[styles.backgroundMain, { backgroundColor: selectedColor }]}
      imageStyle={{ opacity: 0.15 }}
    >
      <View
        accessibile={true}
        accessibilityLabel='Intro Container'
        style={styles.introContainer}
      >
        <Text
          accessibilityLabel='Title'
          style={[styles.title, { color: selectedColorContrast }]}
        >
          NoodlesBowl
        </Text>
        <Text
          accessibilityLabel='Subtitle'
          style={[styles.subtitle, { color: selectedColorContrast }]}
        >
          Chat
        </Text>
        <Text
          accessibilityLabel='Tagline'
          style={[styles.tagline, { color: selectedColorContrast }]}
        >
          The tastiest way to connect
        </Text>
      </View>
      <View
        accessibile={true}
        accessibilityLabel='Body Container'
        style={styles.bodyContainer}
      >
        <View
          accessibile={true}
          accessibilityLabel='Text Input Container'
          style={styles.textInputContainer}
        >
          <Image
            source={require('../assets/input_icon.png')}
            style={styles.textInputBackground}
          />
          <TextInput
            accessibilityLabel='Username Text Input'
            style={[styles.textInput, styles.baseText]}
            value={name}
            onChangeText={setName}
            placeholder='Type your username here'
          />
        </View>
        <View style={styles.colorPickerContainer}>
          <Text
            accessibilityLabel='Color Picker Label'
            style={[styles.baseText, styles.colorPickerLabel]}
          >
            Choose Background Color:
          </Text>
          <View accessibilityLabel='Color Picker' style={styles.colorPicker}>
            {colorOptions.map((color, index) => (
              <TouchableOpacity
                accessibilityLabel={`Color Option ${colorLabels[index]}`}
                key={`color__option-${index}`}
                activeOpacity={0.8}
                style={[
                  styles.colorOption,
                  { backgroundColor: color },
                  selectedColor === color && {
                    outlineWidth: 2,
                    outlineColor: color,
                    outlineOffset: 2,
                  },
                ]}
                onPress={() => {
                  setSelectedColor(color);
                  setSelectedColorLabel(colorLabels[index]);
                  setSelectedColorContrast(colorOptionContrast[index]);
                }}
              ></TouchableOpacity>
            ))}
          </View>
        </View>
        <View
          accessibile={true}
          accessibilityLabel='Actions Container'
          style={styles.actionsContainer}
        >
          <Pressable
            accessibilityLabel='Start Chatting Button'
            onPress={() => {
              const missingFields = [];
              if (!name) missingFields.push('username');
              if (!selectedColor) missingFields.push('color');

              if (missingFields.length > 0) {
                Alert.alert(`Please provide a ${missingFields.join(' and ')}`);
              } else {
                signInUser();
              }
            }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? selectedColorContrast
                  : selectedColor,
              },
              {
                borderColor: selectedColor,
              },
              styles.button,
              { color: selectedColorContrast },
            ]}
          >
            {({ pressed }) => (
              <Text
                accessibilityLabel='Start Chatting Button Text'
                style={[
                  styles.baseText,
                  styles.buttonText,
                  { color: pressed ? selectedColor : selectedColorContrast },
                ]}
              >
                Start Chatting
              </Text>
            )}
          </Pressable>
        </View>
      </View>
      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView behavior='padding' />
      ) : null}
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
  },
  button: {
    width: '100%',
    height: 54,
    // backgroundColor: '#757083',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
  },
  buttonText: {
    fontWeight: '600',
  },
});

export default Start;
