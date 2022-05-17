import * as SecureStore from "expo-secure-store"
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { StackParamList } from '../typings/navigations';
import { logout, rehydrateUser } from '../store/actions/user.actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../App';
import { User } from "../entities/User";

type ScreenNavigationType = NativeStackNavigationProp<StackParamList, "Profile">;

export default function ProfileScreen() {
    const navigation = useNavigation<ScreenNavigationType>();

    const dispatch = useDispatch();

    const displayName = useSelector((state : RootState) => state.user.loggedInUser.displayName);
    const idToken = useSelector((state : RootState) => state.user.idToken);
    const user: User = useSelector((state: RootState) => state.user.loggedInUser);


    async function getUserInfo() {
        
        const request = {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body  : JSON.stringify({
                idToken : idToken,
                returnSecureToken : true
            })
        }
        
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDlO9g-z87u34DcKesUQmUJ81HqYsUXRqY", request);

        if (!response.ok) {
            //handle error
            console.log("error getting profile info");
        }

        else {
            const data = await response.json();
            const newUser = new User(data.users[0].email, data.users[0].displayName, data.users[0].photoUrl);

            await SecureStore.setItemAsync("user", JSON.stringify(newUser));
            
            dispatch(rehydrateUser(newUser, idToken));
        }

    }


    useEffect(() => {
        getUserInfo();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.infoAndImage}>
                {user.photoUrl !== "" && <Image source={{ uri: user.photoUrl }} style={styles.image} />}
                <View style={{marginTop : 15}}>
                    <Text>{user.email}</Text>
                    {user.displayName !== "" && <Text>Logged in as {displayName}</Text>}
                </View>    
            </View>
            <Button title="Edit profile" onPress={() => navigation.navigate("EditProfile")} />
            
            <View style={{marginTop: "auto"}}>
                <Button color={"red"} title='Log out' onPress={() => dispatch(logout())}/>  
            </View>
          
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    image: {
        width: 120, 
        height: 120, 
        borderRadius: 200, 
        borderWidth: 3, 
        borderColor: "grey" 
    },
    infoAndImage: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
    }
})