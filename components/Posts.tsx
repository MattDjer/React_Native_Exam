import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity, TouchableHighlight, Keyboard } from 'react-native';
import { fetchPosts } from '../store/actions/post.actions';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../entities/Post';
import { createPost, postDetails, addLikeToPost, removeLikeFromPost } from '../store/actions/post.actions';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from "../typings/navigations";
import { User } from "../entities/User"
import { RootState } from '../App';


type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "Posts"
>

export default function Posts() {
    const navigation = useNavigation<ScreenNavigationType>()

    const user: User = useSelector((state: RootState) => state.user.loggedInUser);
    const posts: Post[] = useSelector((state: any) => state.post.posts) 

    const dispatch = useDispatch()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('')

    useEffect(() => {
        dispatch(fetchPosts());        
    }, [])


    // Add new post
    const handleAddPost = () => {       
        const post: Post = new Post(title, 
                                    description, 
                                    new Date(), 
                                    "undefined",  // user ID 
                                    "undefined",  // user Mail
                                    [],           // empty array for comments
                                    0,            // number of likes
                                    "undefined"); // user DisplayName 
        dispatch(createPost(post));
        dispatch(fetchPosts())
        setTitle('')
        setDescription('')

        Keyboard.dismiss() // leaves keyboard when submitting
    }

    // Handle User Likes
    const handleAddLike = (numberOfLikes: number, postId: string) => {
        dispatch(addLikeToPost(numberOfLikes, postId))
        dispatch(fetchPosts())
    }

    const handleRemoveLike = (numberOfLikes: number, postId: string) => {
        dispatch(removeLikeFromPost(numberOfLikes, postId))
        dispatch(fetchPosts())
    }


    // Used to sum number of comments
    let count = 0
    function sumComments(item: any) {
        for (let comment in item.comments) {
            count += 1
        }
    }

    function resetCount() { count = 0 }


    // Render like button based on whether user already liked the post
    function renderLikeButton(item: any) {
        for (let userLike in item.userLikes) {
            if (item.userLikes[userLike].email == user.email) { 
                return <Text>
                            <Button title='Liked' onPress={() => handleRemoveLike(item.numberOfLikes, item.id)}>Liked</Button>       
                        </Text>
                }
                } return <Text>
                            <Button title='Like' onPress={() => handleAddLike(item.numberOfLikes, item.id)}>Like</Button>       
                        </Text>
    }


    // Navigation
    const goToDetails = (post: any) => {        
        dispatch(postDetails(post));
        navigation.navigate("Details")
    }


    return (      
        <>
        <TouchableOpacity style={styles.container}>
            <View style={{alignItems: "center"}}> 
                <Text>Create post</Text>
            </View>

            <View style={{margin: 10}}>           
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

        <View>
            <Text style={{fontSize: 35, alignSelf: "center"}}>All posts</Text>
        </View>
        

        <FlatList
            style={{marginBottom: 50}}
            data={posts}
            renderItem={({ item }: { item: any }) => (        
                <TouchableOpacity onPress={() => goToDetails(item)}>

                    <View style={styles.container}>
                        
                        <View style={{flexDirection: "row", justifyContent: 'space-between', padding: 10, }}>                          
                            <Text style={{fontSize: 12, color: "purple"}}>
                                        {item.displayName ? item.displayName : item.userMail}                                        
                            </Text>

                            {resetCount()}
                            {sumComments(item)}
                            
                            <Text style={{color: "blue"}}>Comments: {count}</Text>                                 
                            <Text style={{color: "blue"}}>Likes: {item.numberOfLikes}</Text>                                            
                            {renderLikeButton(item)}                                                 
                        </View>

                        <View>
                            <Text style={{fontSize: 20, alignSelf: "center" }}>{item.title}</Text>
                        </View>

                        <View style={{paddingLeft: 10, paddingBottom: 5}}>
                            <Text style={{fontSize: 15}}>{item.description}</Text>  
                        </View>              
                    
                    </View>  

                </TouchableOpacity>              
            )}    
            >
        </FlatList>     
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "white", 
        marginBottom: 10, 
        borderRadius: 10, 
        alignSelf: "center", 
        width: 400
    },
})