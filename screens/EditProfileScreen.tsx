import React, { useState } from 'react';
import { Button, LogBox, StyleSheet, Text, View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../App';
import ImagePickerExample from '../components/ImagePickerExample';
import Input from '../components/Input';
import { User } from '../entities/User';
import { updateEmail, updateProfileInfo } from '../store/actions/profile.actions';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import uuid from "react-native-uuid";
import * as ImagePicker from 'expo-image-picker';
import { rehydrateUser } from '../store/actions/user.actions';



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



export default function EditProfileScreen() {
    const user: User = useSelector((state: RootState) => state.user.loggedInUser);
    const [textEmail, setTextEmail] = useState(user.email);
    const [textDisplayName, setTextDisplayName] = useState(user.displayName ? user.displayName : "");
    const [image, setImage] = useState<string | null>(user.photoUrl ? user.photoUrl : null);
    const [imageChanged, setImageChanged] = useState(false);
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
        setImageChanged(true);
      }
    };
    // console.log(user.email);

    const onSave = () => {
        if (textEmail !== ''  /* && other inputs are not empty */) {
            // save the data to the server
            dispatch(updateEmail(textEmail));
            if (imageChanged) {
                setImageChanged(false);
                dispatch(updateProfileInfo(textDisplayName, image));

            }

            else {
                dispatch(updateProfileInfo(textDisplayName));
            }
            
        } else {
            //Show error message
        }
    }

    return (
        <View style={styles.container}>
            <Text>Edit Profile Screen</Text>
            <Input title="What is your email?"
                inputValue={textEmail}
                setText={setTextEmail}
                error="Email cannot be empty"
            />

            <Input title='What name should be displayed to other people'
                inputValue={textDisplayName}
                setText={setTextDisplayName}
                error={"Display name can't be empty"}
            />

            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <Button title='upload to server' onPress={() => {if (image) { dispatch(uploadImageAsync(image)) } }}/>

            <Button title="Save" onPress={onSave} />
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})