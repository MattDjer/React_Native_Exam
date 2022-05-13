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
    dispatch(fetchPosts())
    
    const postDetails = () => {
        console.log("Hello")
        console.log()
    }

    const renderPost = ({ item }: { item: any }) => (
        <TouchableOpacity onPress={() => postDetails()}>
            <View style={{backgroundColor: "white", }}>        
                <Text style={{fontSize: 20, marginTop: 5, width: 400, borderRadius: 210}}>{item.title} </Text>
                <Text style={{marginBottom: 1}}>{item.description}</Text>  
            </View>
        </TouchableOpacity>      
    );

    return (
        <>
        {posts.map((post: any, index) => (

            <View> Hello </View>
        
        ))}

        <View style={styles.container}>
            
            <View>
                <Text style={{fontSize: 35}}>All posts</Text>
            </View>
            
            <View>
                <FlatList                
                    style={{flexDirection: "row"}}
                    data={posts}
                    renderItem={renderPost}

                />
            </View>
        </View>

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