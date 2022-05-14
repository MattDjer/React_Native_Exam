import React, { useState } from 'react';
import { Button, StyleSheet, View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../App';
import Input from '../components/Input';
import { User } from '../entities/User';
import { updateEmail, updateProfileInfo } from '../store/actions/profile.actions';
import * as ImagePicker from 'expo-image-picker';

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
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
  
      if (!result.cancelled) {
        setImage(result.uri);
        setImageChanged(true);
      }
    };

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
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <Button title="Change profile picture" onPress={pickImage} />
            
            <Input title="What is your email?"
                inputValue={textEmail}
                setText={setTextEmail}
                error="Email cannot be empty"
            />

            <Input title='What name should be displayed to other people'
                inputValue={textDisplayName}
                setText={setTextDisplayName}
                error={"Display name can't be empty"}
                placeholder="Enter displayname here"
            />

            <Button title="Save" onPress={onSave} />           
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
})