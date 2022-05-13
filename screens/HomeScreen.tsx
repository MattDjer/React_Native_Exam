import React from 'react';
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/user.actions';
import Navbar from '../components/Navbar';
import Posts from '../components/Posts';
import { SafeAreaView } from 'react-native-safe-area-context';
import firebaseApp from "../firebase";
import { getApps } from "firebase/app";

export default function HomeScreen() {
    const dispatch = useDispatch();

    function printFirebaseApps() {
        console.log("number of instances: ", getApps().length);
        console.log("app: ", firebaseApp);
    }

    return (

        <SafeAreaView>
            <Navbar/>
            <ScrollView>        
                <Button title="Logout" onPress={() => dispatch(logout())} />
                <Button title="print firebase" onPress={printFirebaseApps}/>
            </ScrollView>
        </SafeAreaView>
    );
}
