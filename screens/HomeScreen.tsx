import React from 'react';
import { Text, Image, View, Button } from 'react-native';
import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'


import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {

    const queryClient = useQueryClient()

    const { isLoading, error, data } = useQuery("events", () => {
       
       let categories = Math.random() > 0.5 ? "music" : "lectures-books"
       let country = Math.random() > 0.5 ? "danmark" : "germany"

       return axios.get('https://api.yelp.com/v3/events?offset=0&location=' + country + '&limit=1&is_free=true&categories=' + categories, {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 't78Db5weOu36zqeM_2TOWiXlpeESNocdOQBPbozfVzXZmB8ZaftYY5SzLP2KABAiiXUZ6ea45KheWrSKT_AEOxAb0j6CueBin__Kf543l2_QmmLzxYUmrroNNd2DYnYx'
            }
        })
    }    
    )
    
   
    return (
        <SafeAreaView style={{alignItems: "center", backgroundColor: "white"}}>
            
            <Text style={{marginBottom: 40}}> Welcome to the GoodTimes app</Text>
            
            <Text style={{fontSize: 20, marginTop: 10}}>Here you can find official events</Text>
            <Text>Go to the Events tab to search at your location!</Text>
            <Image 
                source={{ uri: "https://c.tenor.com/QM-si3_EAyIAAAAC/listening-to-music-dancing.gif" }} 
                style={{ width: "100%", height: 180 }} />


            {isLoading ? <Text> Looking for event ... </Text> : <></>}
            {error ? <Text> {error instanceof Error ? error.message : ""} </Text> : <></>}
            
            {data?.data.events.length > 0 ? 
            <View style={{alignItems: "center", padding: 10}}>
                <Text style={{margin: 10, fontSize: 20}}> Recommended event of the day </Text>
                <Text>{data!.data.events[0].name}</Text>
                <Image source={{ uri : data!.data.events[0].image_url}} style={{width: 200, height: 200}}></Image>
            </View> 
            :
            <View> 
                <Text> No events found </Text>
            </View>    
            }

            <View style={{marginBottom: 70}}>
                <Button title="Update newest event" onPress={() => queryClient.invalidateQueries('events')}></Button>
            </View>

        </SafeAreaView>
    );
}
