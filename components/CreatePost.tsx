import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Keyboard } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { createPost } from '../store/actions/post.actions';
import { getDate } from './GetDate';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import uuid from "react-native-uuid"
import firebaseApp from '../firebase';
import { useDispatch } from 'react-redux';


const uploadAndGetUrl = async (image: string) => {
    const response = await fetch(image);
    const blob = await response.blob();

    const storage = getStorage(firebaseApp);
    const filename = uuid.v4().toString();
    const imageRef = ref(storage, filename);

    await uploadBytesResumable(imageRef, blob);
    return await getDownloadURL(imageRef);
}


export default function CreatePost() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const dispatch = useDispatch();

    const [openCreateForm, setOpenCreateForm] = useState(false);

    const handleAddPost = async (title : string, description : string, image : string | null) => {
        const url = image ? await uploadAndGetUrl(image) : ""; 
        const currentDate = getDate();
                                
        dispatch(createPost(title, description, currentDate, url));
        Keyboard.dismiss(); // leaves keyboard after submitting post
    }


    function resetFields() {
        setTitle("");
        setImage(null);
        setDescription("");
    }

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
        }
    };

        return (
            <>
                <TouchableOpacity style={styles.container} onPress={() => setOpenCreateForm(!openCreateForm)}>
                    <View style={{alignItems: "center"}}>
                        <Text>Create post</Text>
                    </View>
                </TouchableOpacity>

                {openCreateForm && (
                    <View style={{margin: 10}}>           
                    <TextInput 
                        placeholder="Title" 
                        value={title} 
                        onChangeText={setTitle}/>


                    <View style={styles.uploadAndImage}>
                        <Button title="Add post picture" onPress={pickImage} />
                    </View>    

                    <View>                            
                        {image && <Image source={{ uri: image }} style={styles.imageCreate} />}
                    </View>            

                    <TextInput 
                        placeholder="Description"
                        value={description} 
                        onChangeText={setDescription}/>

                    <Button title='Submit' onPress={() => {resetFields(); handleAddPost(title, description, image)}}/>         
                    </View>
                )}
            </>
        ) 
  

}



const styles = StyleSheet.create({
    container: {
        backgroundColor: "white", 
        marginBottom: 10, 
        borderRadius: 10, 
        alignSelf: "center", 
        width: 370,
    },
    uploadAndImage: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    imageCreate: {
        marginTop: 5,
        width: 200, 
        height: 200, 
        borderWidth: 3, 
        borderColor: "grey",
        alignSelf: "center", 
    },
    imagePosts: {
        marginTop: 5,
        width: 300, 
        height: 300, 
        borderWidth: 3, 
        borderColor: "grey",
        alignSelf: "center", 
    },
    border: {
        borderBottomWidth: 1,
        borderBottomColor: "black"
    }
})
