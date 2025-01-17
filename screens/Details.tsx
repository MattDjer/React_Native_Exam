import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, Keyboard, FlatList, Image } from 'react-native';
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

    const [commentText, setCommentText] = useState('')   

    useEffect(() => {
        dispatch(fetchComments(post.id));
    }, [])
        

    const postComment = () => {
        dispatch(addComment(commentText, post))
        setCommentText('')
        Keyboard.dismiss()
    }
    
    function renderComment({ item }: { item: any }) {
        return (
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
        )
    }

    // Render like button based on whether user already liked the post
    const LikeButton = ({ item } : {item : Post}) => {
        for (let userLike in item.userLikes) {
            if (item.userLikes[userLike].email == user.email) {
                return <Button title='Liked' onPress={() => dispatch(removeLikeFromPost(item.id))}>Liked</Button>                       
            }
        }   
        
        return <Button title='Like' onPress={() => dispatch(addLikeToPost(item.id))}>Like</Button>            
    }


    const PostImage = ({ photoUrl } : { photoUrl : string}) => {
        if (photoUrl) { 
            return  <View>
                        <Image source={{ uri : photoUrl }} style={styles.imagePost} />
                    </View>
        }
        
        else {
            return <></>
        }
    }


    return (
        <SafeAreaView>
           <View style={styles.container}>
                <View style={styles.container}>
                    <View style={{flexDirection: "row", justifyContent: 'space-between', padding: 10, }}>                          
                        <Text style={{fontSize: 12, color: "purple"}}>
                                    {post.displayName ? post.displayName : post.userMail}                                        
                        </Text>

                        <Text style={{color: "blue"}}>Comments: {comments.length}</Text>                                 
                        <Text style={{color: "blue"}}>Likes: {post.numberOfLikes}</Text>                                            
                        <LikeButton item={post}/>                                                
                    </View>

                    <View style={styles.border}></View>

                    <View>
                        <Text style={{fontSize: 20, alignSelf: "center" }}>{post.title}</Text>
                    </View>

                    <PostImage photoUrl={post.photoUrl}/>

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
                    value={commentText}
                    onChangeText={setCommentText}
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
                renderItem={renderComment}
                contentContainerStyle={{paddingTop : 100}}                              
            />          
        </SafeAreaView>   
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
