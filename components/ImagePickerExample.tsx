import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import { async } from '@firebase/util';
import uuid from "react-native-uuid";
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

function uploadImageAsync(uri : string) {
    return async function(dispatch : any, getState : any) {
        const response = await fetch(uri);
        const blob = await response.blob();
        const storage = getStorage();
        const filename = uuid.v4().toString();
        const imageRef = ref(storage, filename);
  
        uploadBytesResumable(imageRef, blob).then((snapshot) => {
          console.log('Uploaded a blob or file!');
          dispatch(setProfilePicture(filename));
        })

    }
}

function setProfilePicture(filename : string) {
    return async function(dispatch : any, getState : any) {
        const storage = getStorage();
        const imageRef = ref(storage, filename);
        const url = await getDownloadURL(imageRef);
        console.log(url);
    }
} 

export default function ImagePickerExample() {
  const [image, setImage] = useState<string | null>(null);
  const dispatch = useDispatch();



  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      //uploadImageAsync(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title='upload to server' onPress={() => {if (image) { dispatch(uploadImageAsync(image)) } }}/>
    </View>
  );
}