import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchPosts } from '../store/actions/post.actions';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../entities/Post';


export default function Posts() {
    const dispatch = useDispatch();

    const posts: Post[] = useSelector((state: any) => state.post.posts)
    dispatch(fetchPosts())
    

    const renderPost = ({ item }: { item: any }) => (
        <Text>{item.title} {item.description}</Text>        
    );

    return (
        
        <View style={styles.container}>
            <Text>All posts</Text>
            
            <FlatList 
                
                style={{flexDirection: "row"}}
                data={posts}
                renderItem={renderPost}
                
            />

        </View>
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