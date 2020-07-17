import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableNativeFeedback,
  View,
  Alert,
  Image,
} from 'react-native';
import { TextInput, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Colors from '../utils/colors';

const NewBlogger = () => {
  //   const inputAccessoryViewID = 'uniqueID';
  //   const initialText = 'Insert Your Name Please';
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [upload, setUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imgUrl, setImage] = useState();
  // pic by camera
  const handleCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      setUpload(false);
      const data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        const imageFile = {
          uri: data.uri,
          type: `blogger/${data.uri.split('.')[1]}`,
          name: `blogger/${data.uri.split('.')[1]}`,
        };
        uploadImg(imageFile);
      }
    } else {
      Alert.alert('Permission Denied');
    }
    setUpload(false);
  };

  // pic from gallery
  const handleGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      setUpload(false);
      const data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!data.cancelled) {
        const imageFile = {
          uri: data.uri,
          type: `blogger/${data.uri.split('.')[1]}`,
          name: `blogger/${data.uri.split('.')[1]}`,
        };
        uploadImg(imageFile);
      }
    } else {
      Alert.alert('Permission Denied');
    }
  };

  const uploadImg = (imgFile) => {
    const data = new FormData();
    data.append('file', imgFile);
    data.append('upload_preset', 'bloggerApp');
    data.append('cloud_name', 'gsg');
    setUploading(true);
    axios
      .post('https://api.cloudinary.com/v1_1/gsg/image/upload', data)
      .then((response) => {
        setUploading(false);
        setImage(response.data.url);
      })
      .catch(() => {
        setUploading(false);
        Alert.alert('Yore picture is too big for blogger');
      });
  };

  const addNewBlogger = () => {
    if (name || description) {
      axios
        .post('https://w7-mariam-salah.herokuapp.com/create-post', {
          title: name,
          detail: description,
          img: imgUrl,
        })
        .then(() => handleClear())
        .catch(() => Alert.alert('Something wrong in network'));
    } else {
      Alert.alert('Check your data please');
    }
  };

  const handleClear = () => {
    setImage();
    setName('');
    setDescription('');
    setUpload(false);
    Alert.alert('You add New Blogger');
  };
  useEffect(() => {
    if (upload) {
      setTimeout(() => {
        setUpload(!upload);
      }, 5 * 1000);
    }
  });
  return (
    <>
      <SafeAreaView
        style={styles.BloggersContainer}
        keyboardDismissMode='interactive'
      >
        <TextInput
          label='Insert Your Name'
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.TextInput}
        />
        <TextInput
          label='Insert Your Description'
          value={description}
          onChangeText={(text) => setDescription(text)}
          style={styles.TextInput}
          numberOfLines={3}
        />
           <ActivityIndicator
            size={50}
            animating={uploading}
            color={Colors.Complementary}
            style={{ position: 'absolute', top: '50%', right: '50%' }}
          />
        <Image
          source={{ uri: imgUrl, width: '100%', height: 250 }}
          style={{ marginBottom: 10, marginTop: 20 }}
        />
        <Button title='Upload Image' onPress={() => setUpload(true)} />
        <TouchableNativeFeedback>
          <View style={styles.addButton}>
            <Text
              onPress={addNewBlogger}
              style={{
                color: '#F7F7F7',
                fontSize: 35,
              }}
            >
              +
            </Text>
          </View>
        </TouchableNativeFeedback>
        <Modal
          animationType='slide'
          transparent={true}
          visible={upload}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.openButton}>
              <Text style={styles.textStyle} onPress={() => handleCamera()}>
                Camera
              </Text>
              <Text style={styles.textStyle} onPress={() => handleGallery()}>
                Gallery
              </Text>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 70,
  },
  openButton: {
    borderRadius: 20,
    padding: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    backgroundColor: '#FFFF',
    zIndex: 0,
  },
  textStyle: {
    margin: 15,
    color: '#2196F3',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  TextInput: {
    marginTop: 10,
    backgroundColor: 'transparent',
    color: 'black',
  },
  addButton: {
    flex: 1,
    position: 'absolute',
    bottom: 10,
    right: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 50,
    width: 50,
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  BloggersContainer: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 0,
    flex: 1,
  },
});

export default NewBlogger;
