import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchPosts } from '../store/actions/post.actions';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../entities/Post';


export default function Posts() {
    
    

    const dispatch = useDispatch();
    const posts: Post[] = useSelector((state: any) => state.post.posts) 
    
    useEffect(() => {
        dispatch(fetchPosts());
    }, [])



    return (
        
        <>
        <TouchableOpacity>
            <View> 
                <Text>Create post</Text>
            </View>
        </TouchableOpacity>

        <View style={styles.container}>
                <Text style={{fontSize: 35}}>All posts</Text>
        </View>
        
        {posts.map((post: any, index) => (
            <TouchableOpacity>
                <View style={{backgroundColor: "white", marginBottom: 10, borderRadius: 10}}>
                    <Text style={{fontSize: 20}}>{posts[index].title}</Text>
                    <Text style={{fontSize: 15}}>{posts[index].description}</Text>
                </View> 
            </TouchableOpacity>      
        ))}
        
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        fontSize: 50,
        fontWeight: "700",
        margin: 15,
    },
})