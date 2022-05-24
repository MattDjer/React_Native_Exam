import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity, Keyboard } from 'react-native';
import { fetchPosts, POST_DETAILS } from '../store/actions/post.actions';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../entities/Post';
import { createPost, addLikeToPost, removeLikeFromPost } from '../store/actions/post.actions';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from "../typings/navigations";
import { User } from "../entities/User"
import { RootState } from '../App';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import firebaseApp from '../firebase';
import uuid from "react-native-uuid"
import { getDate } from '../components/GetDate'


type ScreenNavigationType = NativeStackNavigationProp<
    StackParamList,
    "Posts"
>

const uploadAndGetUrl = async (image: string) => {
    const response = await fetch(image);
    const blob = await response.blob();

    const storage = getStorage(firebaseApp);
    const filename = uuid.v4().toString();
    const imageRef = ref(storage, filename);

    await uploadBytesResumable(imageRef, blob);
    return await getDownloadURL(imageRef);
}

export default function Posts() {
    const navigation = useNavigation<ScreenNavigationType>();
    const dispatch = useDispatch();

    const user: User = useSelector((state: RootState) => state.user.loggedInUser);
    const posts: Post[] = useSelector((state: any) => state.post.posts); 
    
    const [openCreateForm, setOpenCreateForm] = useState(false);

    useEffect(() => {
        dispatch(fetchPosts());       
    }, [])
    
    
    const handleAddPost = async (title : string, description : string, image : string | null) => {
        const url = image ? await uploadAndGetUrl(image) : ""; 
        const currentDate = getDate();
                                   
        dispatch(createPost(title, description, currentDate, url));
        Keyboard.dismiss(); // leaves keyboard after submitting post
    }

    // Render Title
    const PageTitle = () => {
        if (posts.length > 0) {
            return <Text style={{fontSize: 25, alignSelf: "center"}}>All posts</Text>
        }
        return <Text style={{fontSize: 20, alignSelf: "center"}}>Add your first post above</Text>
    }
 

    // Render like button based on whether user already liked the post
    const LikeButton = ({ item } : {item : Post}) => {
        for (let userLike in item.userLikes) {
            if (item.userLikes[userLike].email == user.email) {
                return <Button title='Liked' onPress={() => dispatch(removeLikeFromPost(item.numberOfLikes, item.id))}>Liked</Button>                       
            }
        }   
        
        return <Button title='Like' onPress={() => dispatch(addLikeToPost(item.numberOfLikes, item.id))}>Like</Button>            
    }


    const PostForm = () => {
        const [title, setTitle] = useState('');
        const [description, setDescription] = useState('');
        const [image, setImage] = useState<string | null>(null);

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


    // Navigation to Post Details
    const goToDetails = (post: any) => {        
        dispatch({ type: POST_DETAILS, payload: post })
        navigation.navigate("Details")
    }


    const renderPost = ({ item }: { item: any }) => {
        return (
            <TouchableOpacity onPress={() => goToDetails(item)}>
                    <View style={styles.container}>
                        
                        <View style={{flexDirection: "row", justifyContent: 'space-between', padding: 10, }}>                          
                            <Text style={{fontSize: 12, color: "purple"}}>
                                        {item.displayName ? item.displayName : item.userMail}                                        
                            </Text>
                            
                            <Text style={{color: "blue"}}>Comments: {item.comments.length}</Text>                                 
                            <Text style={{color: "blue"}}>Likes: {item.numberOfLikes}</Text>                                            
                            <LikeButton item={item}/>                                                 
                        </View>

                        <View style={styles.border}></View>

                        <View>
                            <Text style={{fontSize: 20, alignSelf: "center" }}>{item.title}</Text>
                        </View>

                        <View>
                            {item.photoUrl !== "" && (<Image source={{ uri: item.photoUrl }} style={styles.imagePosts} />)}
                        </View>   

                        <View style={{paddingLeft: 35, paddingBottom: 5, paddingRight: 35}}>
                            <Text style={{fontSize: 15}}>{item.description}</Text>  
                        </View>

                        <View> 
                            <Text style={{fontSize: 13, padding: 5, color: "blue"}}>{item.timestamp} </Text>    
                        </View>              
                    
                    </View>  
                </TouchableOpacity>   
        )
    }
    

    return (      
        <>
 
        <TouchableOpacity style={styles.container} onPress={() => setOpenCreateForm(!openCreateForm)}>
            <View style={{alignItems: "center"}}>
                <Text>Create post</Text>
            </View>
        </TouchableOpacity>

        <PostForm/> 


        <View>
            <PageTitle/>
        </View>
                
        <FlatList
            contentContainerStyle={{paddingTop : 20, alignItems : "center", display : "flex"}}
            style={{display : "flex", marginBottom: 50}}
            data={posts}
            keyExtractor={(posts: any) => posts.id}
            inverted={true}
            renderItem={renderPost}
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

