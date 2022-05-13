import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Button, StyleSheet, Text, TextInput, View, Image, Platform, TouchableHighlight } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { Post } from '../entities/Post';
import { GetDate } from '../components/GetDate';
import { createPost } from '../store/actions/post.actions';
import { ImageHandler } from "../components/ImageUpload"

const CreatePost = () => {
    const dispatch = useDispatch()
    const date = GetDate()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('')

    const handleAddPost = () => {
        
        const post: Post = new Post(title, description, new Date(), "undefined");
        dispatch(createPost(post));
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.cancelled) {
            const image = dataURItoBlob(result.uri)
            console.log(image)
            let reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => {
                console.log("PHOTO URI")
                console.log(e)
                // photo = e.target.result
               
                //console.log(result.uri)           
            }
        }  
    } 
    
    
    function dataURItoBlob(dataURI: string) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(',')[1]);
      
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      
        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
      
        // create a view into the buffer
        var ia = new Uint8Array(ab);
      
        // set the bytes of the buffer to the correct values
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
      
        // write the ArrayBuffer to a blob, and you're done
        var blob = new Blob([ab], {type: mimeString});
        return blob;     
      }

    return (
    <SafeAreaView>    
        <Text> Upload post </Text>
        <View>
            
            <TextInput 
                placeholder="Title" 
                value={title} 
                onChangeText={setTitle}/>

            
            <TouchableHighlight onPress={pickImage}>
                <Text>select image</Text>
            </TouchableHighlight>
            

            <TextInput 
                placeholder="Description" 
                onChangeText={setDescription}/>

            

            <Button title='Submit' onPress={handleAddPost}/>
          
        </View>
    </SafeAreaView>
    )
  
}

export default CreatePost;