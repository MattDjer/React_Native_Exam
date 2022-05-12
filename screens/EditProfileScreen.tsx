import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../App';
import Input from '../components/Input';
import { User } from '../entities/User';
import { updateEmail } from '../store/actions/profile.actions';



export default function EditProfileScreen() {
    const user: User = useSelector((state: RootState) => state.user.loggedInUser);
    const [textEmail, setTextEmail] = useState(user.email)
    // console.log(user.email);

    const dispatch = useDispatch();

    const onSave = () => {
        if (textEmail !== ''  /* && other inputs are not empty */) {
            // save the data to the server
            dispatch(updateEmail(textEmail));
        } else {
            //Show error message
        }
    }

    return (
        <View style={styles.container}>
            <Text>Edit Profile Screen</Text>
            <Input title="What is your email?"
                inputValue={textEmail}
                setText={setTextEmail}
                error="Email cannot be empty"
            />
            {/* <Input title="Study programme"
                inputValue=""
                error="Study programme cannot be empty" /> */}

            <Button title="Save" onPress={onSave} />
            
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