import React from 'react';
import { StyleSheet, View } from 'react-native';


export default function Navbar() {

    return (
        <View style={styles.container}></View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        fontSize: 50,
        fontWeight: "700",
        margin: 2,
    },
})