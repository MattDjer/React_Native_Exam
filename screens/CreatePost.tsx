import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { Post } from '../entities/Post';
import { getDate } from '../components/GetDate';
import { createPost } from '../store/actions/post.actions';


const CreatePost = () => {
    const dispatch = useDispatch()
    const date = getDate()
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');

    const handleAddPost = () => {
        
        const post: Post = new Post(title, description, new Date(), "undefined");
        dispatch(createPost(post));
    }
    

    return (
    <SafeAreaView>    
        <Text> Hey </Text>
        <View>
            <Text>
                Hey igen 123 
            </Text>


            <TextInput 
                placeholder="Title" 
                value={title} 
                onChangeText={setTitle}/>

            <TextInput 
                placeholder="Description" 
                onChangeText={setDescription}/>

            <Button title='Submit' onPress={handleAddPost}/>
          
        </View>
    </SafeAreaView>
    )
}

export default CreatePost;