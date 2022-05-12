import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

const heyComp = () => {
    return (
    <SafeAreaView>    
        <Text> Hey </Text>
        <View>
            <Text>
                Hey igen
            </Text>
           
        </View>
    </SafeAreaView>
    )
}

export default heyComp;