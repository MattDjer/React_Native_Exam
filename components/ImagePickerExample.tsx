import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import { async } from '@firebase/util';
import uuid from "react-native-uuid";

function uploadImageAsync(uri : string) {
    return async function(dispatch : any, getState : any) {
        console.log(1);
        const response = await fetch(uri);
        console.log(2);
        const blob = await response.blob();
        console.log(3);
        const storage = getStorage();
        console.log(4);
        const imageRef = ref(storage, uuid.v4());
        console.log(5);
  
        uploadBytesResumable(imageRef, blob).then((snapshot) => {
          console.log('Uploaded a blob or file!');
        })

        console.log(6);
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
      <Button title='upload to server' onPress={() => dispatch(uploadImageAsync(image))}/>
    </View>
  );
}