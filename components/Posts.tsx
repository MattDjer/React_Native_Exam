import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity, TouchableHighlight, Keyboard } from 'react-native';
import { fetchPosts } from '../store/actions/post.actions';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../entities/Post';
import { createPost, postDetails } from '../store/actions/post.actions';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from "../typings/navigations";


type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "Posts"
>

export default function Posts() {
    const navigation = useNavigation<ScreenNavigationType>()
    
    const dispatch = useDispatch()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('')

    const handleAddPost = () => {       

        const post: Post = new Post(title, 
                                    description, 
                                    new Date(), 
                                    "undefined",  // user ID 
                                    "undefined",  // user Mail
                                    [],           // empty array for comments
                                    "undefined"); // user DisplayName 
        dispatch(createPost(post));
        dispatch(fetchPosts())
        setTitle('')
        setDescription('')

        Keyboard.dismiss()
    }

    let posts: Post[] = useSelector((state: any) => state.post.posts) 
    
    useEffect(() => {
        dispatch(fetchPosts());        
    }, [])


    // Used to sum comments
    let count = 0
    function sumComments(index: number) {
        for (let comment in posts[index].comments) {
            count += 1
        }
    }

    function resetCount() { count = 0}


    // Navigation
    const goToDetails = (post: any) => {        
        dispatch(postDetails(post));
        navigation.navigate("Details")
    }


    return (
        
        <>
        <TouchableOpacity style={styles.container}>
            <View> 
                <Text>Create post</Text>
            </View>

            <View>           
                <TextInput 
                    placeholder="Title" 
                    value={title} 
                    onChangeText={setTitle}/>            

                <TextInput 
                    placeholder="Description"
                    value={description} 
                    onChangeText={setDescription}/>

                <Button title='Submit' onPress={handleAddPost}/>         
            </View>
        </TouchableOpacity>

        <View style={styles.container}>
                <Text style={{fontSize: 35}}>All posts</Text>
        </View>
        
        {posts.map((post: any, index) => (
            <TouchableOpacity
                key={index} 
                onPress={() => goToDetails(posts[index])}>
                <View style={styles.container}>
                    <View style={{flexDirection: "row", justifyContent: 'space-between', padding: 10, }}> 
                        <Text style={{fontSize: 20}}>{posts[index].title}</Text> 
                        <Text style={{fontSize: 12, color: "purple"}}>
                            {posts[index].displayName ? posts[index].displayName : posts[index].userMail}
                        </Text>
                        {resetCount()}
                        {sumComments(index)}
                        <Text>
                               Comments: {count}                      
                        </Text>
                    </View>
                    
                    <View style={{paddingLeft: 10, paddingBottom: 5}}>
                        <Text style={{fontSize: 15}}>{posts[index].description}</Text>  
                    </View>                        
                </View> 
            </TouchableOpacity>      
        ))}
        
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "white", 
        marginBottom: 10, 
        borderRadius: 10, 
        alignSelf: "center", 
        width: 300
    },
})