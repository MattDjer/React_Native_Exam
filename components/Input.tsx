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
            <TextInput style={styles.inputField} value={inputValue} placeholder={placeholder} autoCorrect={false} onChangeText={handleChangeText} onBlur={() => setEntered(true)} />
            {inputValue === '' && entered ? <Text style={{color: "red"}}>{error}</Text> : <></>}
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
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
        padding: 5
    },

    inputField: {
        marginTop: 3
    },

})

export default Input;