import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Keyboard, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../entities/Post'
import { addComment, fetchComments } from '../store/actions/comment.actions'
import { fetchPosts } from '../store/actions/post.actions'

export default function PostDetails() {
       
    const [comment, setComment] = useState('')   

    const dispatch = useDispatch()
    const postComment = () => {
        dispatch(addComment(comment, post))
        dispatch(fetchComments(post.id))
        dispatch(fetchPosts())
        setComment('')
        Keyboard.dismiss()
    }

    const post: Post[] = useSelector((state: any) => state.post.post) 
    const comments: Comment[] = [] = useSelector((state: any) => state.comment.comments) 

    useEffect(() => {
        dispatch(fetchComments(post.id));
    }, [])


    return (
        <>
        <SafeAreaView>
           <View style={styles.container}>
                    <View style={{flexDirection: "row", justifyContent: 'space-between', padding: 10, }}> 
                        <Text style={{fontSize: 20}}>{post.title}</Text> 
                        <Text style={{fontSize: 12, color: "purple"}}>
                            {post.displayName ? post.displayName : post.userMail}
                        </Text>
                    </View>
                    
                    <View style={{paddingLeft: 10, paddingBottom: 5}}>
                        <Text style={{fontSize: 15}}>{post.description}</Text>  
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
                keyExtractor={(index) => index.toString()} 
                renderItem={({ item }: { item: any }) => (
                    <TouchableOpacity>
                        <View style={styles.container}>
                            <View style={{flexDirection: "row", justifyContent: 'space-between', padding: 10, }}>
                                <Text style={{fontSize: 20}}>{item.text} </Text>
                                <Text style={{fontSize: 12, color: "purple"}}>
                                            {item.displayName ? item.displayName : item.userMail}
                                </Text>
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
        width: 300,
    },
    titles: {
        fontSize: 20,
        marginLeft: 10
    },
    text: {
        fontSize: 15,
        marginLeft: 10
    }
})
