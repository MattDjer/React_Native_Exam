import React from 'react';
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/user.actions';
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