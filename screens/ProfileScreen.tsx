import * as SecureStore from "expo-secure-store"
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StackParamList } from '../typings/navigations';
import { logout, REHYDRATE_USER } from '../store/actions/user.actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../App';
import { User } from "../entities/User";

type ScreenNavigationType = NativeStackNavigationProp<StackParamList, "Profile">;

export default function ProfileScreen() {
    const navigation = useNavigation<ScreenNavigationType>();

    const dispatch = useDispatch();

    const displayName = useSelector((state : RootState) => state.user.loggedInUser.displayName);

    async function getUserInfo() {
        
        const request = {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body  : JSON.stringify({
                idToken : await SecureStore.getItemAsync("idToken"),
                returnSecureToken : true
            })
        }
        
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDlO9g-z87u34DcKesUQmUJ81HqYsUXRqY", request);

        if (!response.ok) {
            //handle error
            console.log("error getting profile info");
        }

        else {
            console.log("profile info retrieved");

            const data = await response.json();

            console.log("user info: ", data);
            
            const newUser = new User(data.users[0].email, data.users[0].displayName, data.users[0].photoUrl);

            await SecureStore.setItemAsync("user", JSON.stringify(newUser));
            
            dispatch({type : REHYDRATE_USER, payload : {user : newUser, idToken : await SecureStore.getItemAsync("idToken"), localId : await SecureStore.getItemAsync("localId")}});
        }

    }

    useEffect(() => {
        getUserInfo();
    }, [])

    return (
        <View style={styles.container}>
            <Text>Profile Screen</Text>
            <Button title="Edit profile" onPress={() => navigation.navigate("EditProfile")} />
            <Text>Logged in as {displayName}</Text>
            <Button title='Logout' onPress={() => dispatch(logout())}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})