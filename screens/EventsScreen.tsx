import React from "react";
import { Text, View, StyleSheet, Button, TextInput, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { fetchEvents } from "../store/actions/event.actions";

export default function EventsScreen() {

    const dispatch = useDispatch();

    return (
        <SafeAreaView style={styles.container}>
            <Text>Find interesting events</Text>
            <Text>Filters: </Text>
            <View style={styles.filter}>
                <View style={{flex: 1}}>
                    <Text>Location</Text>
                    <TextInput placeholder="city, country etc."/>
                </View>
                <View>
                    <Text>Free only: </Text>
                    <Switch/>
                </View>      
            </View>
            <Button title="Fetch events" onPress={() => dispatch(fetchEvents({}))}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    filter: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly"
    }
})