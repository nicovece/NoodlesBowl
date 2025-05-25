import { TouchableOpacity, View, Text, StyleSheet, Alert } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import * as MediaLibrary from 'expo-media-library';

const CustomActions = ({
  wrapperStyle,
  iconTextStyle,
  onSend,
  user,
  storage,
}) => {
  const actionSheet = useActionSheet();

  const generateReference = (uri) => {
    const timeStamp = new Date().getTime();
    const imageName = uri.split('/')[uri.split('/').length - 1];
    return `${user._id}-${timeStamp}-${imageName}`;
  };

  const uploadAndSendImage = async (imageURI) => {
    try {
      const response = await fetch(imageURI);
      const blob = await response.blob();
      const uniqueRefString = generateReference(imageURI);
      const newUploadRef = ref(storage, uniqueRefString);
      await uploadBytes(newUploadRef, blob);
      const downloadURL = await getDownloadURL(newUploadRef);
        uploadBytes(newUploadRef, blob).then(async (snapshot) => {
        const imageURL = await getDownloadURL(snapshot.ref);
        console.log('Image uploaded successfully', imageURL);
        onSend([
          {
            _id: Math.random().toString(36).substring(7),
            createdAt: new Date(),
            user: user || { _id: 1, name: 'User' },
            image: imageURL,
          },
        ]);
      });
    } catch (error) {
      Alert.alert('Image upload failed', error.message);
    }
  };

  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      else Alert.alert("Permissions haven't been granted.");
    }
  };

  // Take photo
  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      else Alert.alert("Permissions haven't been granted");
    }
  };

  // Get location
  const getLocation = async () => {
    try {
      let permissions = await Location.requestForegroundPermissionsAsync();
      if (permissions?.granted) {
        const location = await Location.getCurrentPositionAsync({});
        if (location) {
          onSend([
            {
              _id: Math.random().toString(36).substring(7),
              createdAt: new Date(),
              user: user || { _id: 1, name: 'User' },
              location: {
                longitude: location.coords.longitude,
                latitude: location.coords.latitude,
              },
            },
          ]);
          //console.log('user wants to get their location');
        } else {
          Alert.alert('Error occurred while fetching location');
        }
      } else Alert.alert("Permissions haven't been granted.");
    } catch (error) {
      console.log('Error fetching location:', error);
    }
  };

  // Action sheet
  const onActionPress = () => {
    const options = [
      'Choose From Library',
      'Take Picture',
      'Send Location',
      'Cancel',
    ];
    const cancelButtonIndex = options.length - 1;
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log('user wants to pick an image');
            pickImage();
            return;
          case 1:
            console.log('user wants to take a photo');
            takePhoto();
            return;
          case 2:
            getLocation();
          default:
        }
      }
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onActionPress}
      accessible={true}
      accessibilityLabel="Open actions menu. Tap to choose from sending an image, taking a photo, or sharing your location."
      accessibilityRole="button"
    >
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}
          accessibilityElementsHidden={true}
          importantForAccessibility="no"
        >
          +
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

export default CustomActions;
