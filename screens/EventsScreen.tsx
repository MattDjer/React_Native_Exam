import React, { useState } from "react";
import { Text, View, StyleSheet, Button, TextInput, Switch, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../App";
import { categoryAndFilter, fetchEvents } from "../store/actions/event.actions";

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
    //const categories : categoryAndLabel[] = [{label : "Music", value : "music"}, {label : "Film", value : "film"}, {label : "Lectures and books", value : "lectures-books"}];
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [categoriesOpen, setCategoriesOpen] = useState(false);

    const dispatch = useDispatch();

    function toggleCategory(category : string) {
        if (categoryIsEnabled(category)) {
            const filteredArray = selectedCategories.filter((elm) => elm !== category);
            setSelectedCategories(filteredArray);
        }

        else {
            setSelectedCategories([...selectedCategories, category]);
        }
    }

    function categoryIsEnabled(category : string) {
        const foundElement = selectedCategories.find((elm) => category === elm);
        console.log("called");
        return foundElement !== undefined;
    } 

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
            
            <View>
                <Text>Filter by categories</Text>
                <Button title={!categoriesOpen ? "Open categories" : "Close categories"} onPress={() => setCategoriesOpen(!categoriesOpen)}/>
                {categoriesOpen && (<View>
                    <View style={styles.filter}>
                        <Text>Music</Text>
                        <Switch value={categoryIsEnabled("music")} onValueChange={() => toggleCategory("music")}/>
                    </View>
                    
                    <View style={styles.filter}>
                        <Text>Film</Text>
                        <Switch value={categoryIsEnabled("film")} onValueChange={() => toggleCategory("film")}/>
                    </View>

                    <View style={styles.filter}>
                        <Text>Lectures and books</Text>
                        <Switch value={categoryIsEnabled("lectures-books")} onValueChange={() => toggleCategory("lectures-books")}/>
                    </View>
                </View>)}
            </View>
            
            <Button title="Fetch events" onPress={() => dispatch(fetchEvents({isFree : isFree, location : location, categories : selectedCategories}))}/>
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