import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../App';
import Input from '../components/Input';
import { User } from '../entities/User';
import { RESET_UPDATE_STATUS, updateEmail, updateProfileInfo, UPDATE_PROFILE_FAILED, UPDATE_PROFILE_SUCCESS } from '../store/actions/profile.actions';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';


export default function EditProfileScreen() {
    const user: User = useSelector((state: RootState) => state.user.loggedInUser);
    const updateProfileStatus = useSelector((state : RootState) => state.profile.updateProfileStatus);

    const [textEmail, setTextEmail] = useState(user.email);
    const [textDisplayName, setTextDisplayName] = useState(user.displayName ? user.displayName : "");
    const [image, setImage] = useState<string | null>(user.photoUrl ? user.photoUrl : null);
    const [imageChanged, setImageChanged] = useState(false);


    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.addListener("beforeRemove", (e) => {
            // clear error and success messages
            dispatch({type : RESET_UPDATE_STATUS});
        })
    }, [navigation, updateProfileStatus]);
  
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
        if (textEmail !== '') {
            dispatch({type : RESET_UPDATE_STATUS});
            dispatch(updateEmail(textEmail));
            if (imageChanged) {
                setImageChanged(false);
                dispatch(updateProfileInfo(textDisplayName, image, user.photoUrl));

            }

            else {
                dispatch(updateProfileInfo(textDisplayName));
            }
            
        } else {
            alert("Email cannot be empty");
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>         
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.innerContainer}>
                    <View style={styles.uploadAndImage}>
                        <Button title="Change profile picture" onPress={pickImage} />
                        {image ? (
                            <Image source={{ uri: image }} style={styles.image} />
                        ) : (
                            <Image source={require("../images/default.png")} style={styles.image} />
                        )}
                    </View>


                    <View style={[{display : "flex", flex : 1}]}>
                        <Input title="What is your email?"
                            inputValue={textEmail}
                            setText={setTextEmail}
                            error="Email cannot be empty"
                        />
                    </View>


                    <View style={{display : "flex", flex : 1}}>
                        <Input title='What name should be displayed to other people'
                            inputValue={textDisplayName}
                            setText={setTextDisplayName}
                            error={"Display name can't be empty"}
                            placeholder="Enter displayname here"
                        />
                    </View>
                    
                    {updateProfileStatus === UPDATE_PROFILE_SUCCESS && (<Text style={{color : "green"}}>Profile successfully updated</Text>)}
                    {updateProfileStatus === UPDATE_PROFILE_FAILED && (<Text style={{color : "red"}}>Something went wrong updating profile</Text>)}

                    <View style={{marginTop : "auto"}}>
                        <Button title="Save" onPress={onSave} /> 
                    </View>

            </View>
 
            </TouchableWithoutFeedback>
         
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    uploadAndImage: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flex: 1

    },
    image: {
        width: 150, 
        height: 150, 
        borderRadius: 200, 
        borderWidth: 3, 
        borderColor: "grey" 
    },
    innerContainer: {
        display: "flex",
        flex: 1
    },
    boxWithShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    }
})