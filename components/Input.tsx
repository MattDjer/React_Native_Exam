import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';



const Input = ({ title, inputValue, error, setText, placeholder }:
    { title: string, inputValue: string, error: string, setText: (i: string) => void, placeholder? : string }) => {

    const [entered, setEntered] = useState(false)

    const handleChangeText = (input: string) => {
        setText(input);
        setEntered(true);
    }

    return (
        <View style={styles.container}>
            <Text style={{color: "darkblue"}}>{title}</Text>
            <TextInput style={styles.inputField} value={inputValue} placeholder={placeholder} onChangeText={handleChangeText} onBlur={() => setEntered(true)} />
            {inputValue === '' && entered ? <Text>{error}</Text> : <></>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        //alignItems: 'center',
        // justifyContent: 'center',
        borderColor: "grey",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 10
    },

    inputField: {
       // borderColor : "black",
        //borderStyle : "solid",
        //borderWidth : 1
    }
})

export default Input;