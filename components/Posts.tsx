import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { fetchPosts, POST_DETAILS } from '../store/actions/post.actions';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../entities/Post';
import { addLikeToPost, removeLikeFromPost } from '../store/actions/post.actions';
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
    const navigation = useNavigation<ScreenNavigationType>();
    const dispatch = useDispatch();

    const user: User = useSelector((state: RootState) => state.user.loggedInUser);
    const posts: Post[] = useSelector((state: any) => state.post.posts); 

    useEffect(() => {
        dispatch(fetchPosts());       
    }, [])
    

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

