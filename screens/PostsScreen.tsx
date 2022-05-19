import React from 'react';
import Navbar from '../components/Navbar';
import Posts from '../components/Posts';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PostsScreen() {

    return (

        <SafeAreaView>
            <Navbar/>           
            <Posts />                      
        </SafeAreaView>
    );
}