import React from 'react';
import Posts from '../components/Posts';
import { SafeAreaView } from 'react-native-safe-area-context';
import CreatePost from '../components/CreatePost';

export default function PostsScreen() {

    return (

        <SafeAreaView> 
            <CreatePost/>        
            <Posts />                      
        </SafeAreaView>
    );
}