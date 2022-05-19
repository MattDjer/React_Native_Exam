import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../entities/Post'
import { addComment, fetchComments } from '../store/actions/comment.actions'
import { addLikeToPost, removeLikeFromPost } from '../store/actions/post.actions'
import { User } from "../entities/User"
import { RootState } from '../App';

export default function PostDetails() {
    
    const dispatch = useDispatch()

    const user: User = useSelector((state: RootState) => state.user.loggedInUser);
    const post: Post = useSelector((state: any) => state.post.post)  
    const comments: Comment[] = [] = useSelector((state: any) => state.comment.comments)

    const [comment, setComment] = useState('')   

    useEffect(() => {
        dispatch(fetchComments(post.id));
    }, [])
        

    const postComment = () => {
        dispatch(addComment(comment, post))
        setComment('')
        Keyboard.dismiss()
    }


     // Used to render number of comments
     let count = 0
     function sumComments(item: any) {
        for (let comment in item.comments) { 
            count += 1
        }
     }
 

     // Render like button based on whether user already liked the post
    const renderLikeButton = (item: any) => {
        for (let userLike in item.userLikes) {
            if (item.userLikes[userLike].email == user.email) { 
                return  <Text>
                            <Button title='Liked' onPress={() => handleRemoveLike(item.numberOfLikes, item.id)}>Liked</Button>       
                        </Text>
                }
            }   return  <Text>
                            <Button title='Like' onPress={() => handleAddLike(item.numberOfLikes, item.id)}>Like</Button>       
                        </Text>
    }


    // Handle User Likes
    const handleAddLike = (numberOfLikes: number, postId: string) => {    
        dispatch(addLikeToPost(numberOfLikes, postId))
    }

    const handleRemoveLike = (numberOfLikes: number, postId: string) => {        
        dispatch(removeLikeFromPost(numberOfLikes, postId))
    }

    const renderImage = (photoUrl: any) => {
        if (photoUrl) { 
            return  <View>
                        <Image source={{ uri : photoUrl }} style={styles.imagePost} />
                    </View>
        }     
    }


    return (
        <>
        <SafeAreaView>
           <View style={styles.container}>

                    <View style={styles.container}>
                        
                        <View style={{flexDirection: "row", justifyContent: 'space-between', padding: 10, }}>                          
                            <Text style={{fontSize: 12, color: "purple"}}>
                                        {post.displayName ? post.displayName : post.userMail}                                        
                            </Text>

                            {sumComments(post)}
                            <Text style={{color: "blue"}}>Comments: {count}</Text>                                 
                            <Text style={{color: "blue"}}>Likes: {post.numberOfLikes}</Text>                                            
                            {renderLikeButton(post)}                                                 
                        </View>

                        <View style={styles.border}></View>

                        <View>
                            <Text style={{fontSize: 20, alignSelf: "center" }}>{post.title}</Text>
                        </View>

                            {renderImage(post.photoUrl)}

                        <View style={{paddingLeft: 35, paddingBottom: 5}}>
                            <Text style={{fontSize: 15}}>{post.description}</Text>  
                        </View> 

                        <View>
                            <Text style={{fontSize: 13, padding: 5, color: "blue"}}>{post.timestamp} </Text>     
                        </View>             
                    
                    </View> 
            </View>
            <View style={styles.container}>
                <TextInput 
                    placeholder='Write a comment'
                    style={styles.text}
                    value={comment}
                    onChangeText={setComment}
                />
                <Button 
                    title='Submit' 
                    onPress={postComment}
                />                   
            </View>  
            
            <FlatList
                data={comments}
                keyExtractor={(comment: any) => comment.id}
                inverted={true}
                renderItem={({ item }: { item: any }) => (
                    <TouchableOpacity>
                        
                        <View style={styles.container}>
                           
                            <View style={{flexDirection: "row", justifyContent: 'space-between', padding: 10, }}>                               
                                <Text style={{fontSize: 12, color: "purple"}}>
                                            {item.displayName ? item.displayName : item.userMail}
                                </Text>
                            </View>

                            <View>
                                <Text style={{fontSize: 20, padding: 10}}>{item.text}</Text>
                            </View>

                            <View>
                                <Text style={{fontSize: 13, padding: 5, color: "blue"}}>{item.timestamp} </Text>     
                            </View> 
                        
                        </View>

                    </TouchableOpacity>
                    
                )}                              
            >
            </FlatList>          
        </SafeAreaView>
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
    titles: {
        fontSize: 20,
        marginLeft: 10
    },
    text: {
        fontSize: 15,
        marginLeft: 10
    },
    imagePost: {
        marginTop: 5,
        width: 150, 
        height: 150, 
        borderWidth: 3, 
        borderColor: "grey",
        alignSelf: "center", 
    },
    border: {
        borderBottomWidth: 1,
        borderBottomColor: "black"
    }
})
