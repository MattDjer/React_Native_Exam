import React from 'react';
import { Button, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/user.actions';
import Navbar from '../components/Navbar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const dispatch = useDispatch();
    
    return (
        <SafeAreaView>
            <Navbar/>
            <ScrollView>        
                <Button title="Logout" onPress={() => dispatch(logout())} />
            </ScrollView>
        </SafeAreaView>
    );
}
