import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StackParamList } from '../typings/navigations';
import { logout } from '../store/actions/user.actions';
import { useDispatch } from 'react-redux';

type ScreenNavigationType = NativeStackNavigationProp<StackParamList, "Profile">;

export default function ProfileScreen() {
    const navigation = useNavigation<ScreenNavigationType>();

    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <Text>Profile Screen</Text>
            <Button title="Edit profile" onPress={() => navigation.navigate("EditProfile")} />
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