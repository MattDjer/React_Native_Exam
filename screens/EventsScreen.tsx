import React, { useState } from "react";
import { Text, View, StyleSheet, Button, TextInput, Switch, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../App";
import { fetchEvents } from "../store/actions/event.actions";

const renderItem = ({item} : any) => {
    return (
        <View style={{paddingBottom : 15, paddingTop : 15, display : "flex", alignItems : "center"}}>
            <Text>{item.name}</Text>
            {item.image_url && (<Image source={{uri : item.image_url}} style={{width : 200, height: 200}}/>)}
        </View>
    )
}

export default function EventsScreen() {
    const events = useSelector((state : RootState) => state.event.events);

    const [isFree, setIsfree] = useState(false);
    const [location, setLocation] = useState("");

    const dispatch = useDispatch();

    return (
        <SafeAreaView style={styles.container}>
            <Text>Find interesting events</Text>
            <Text>Filters: </Text>
            <View style={styles.filter}>
                <View style={{flex: 1}}>
                    <Text>Location</Text>
                    <TextInput placeholder="city, country etc." onChangeText={setLocation}/>
                </View>
                <View>
                    <Text>Free only</Text>
                    <Switch value={isFree} onValueChange={() => setIsfree(!isFree)}/>
                </View>      
            </View>
            <Button title="Fetch events" onPress={() => dispatch(fetchEvents({isFree : isFree, location : location}))}/>
            <Text>Events fetched: {events.length}</Text>


            <View style={{flex : 1}}>
                <FlatList
                    contentContainerStyle={{paddingBottom : 100, alignItems : "center", display : "flex"}}
                    data={events}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}      
                />
            </View>
            <Text>This should be visible</Text>



        
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