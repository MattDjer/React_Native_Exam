import React from 'react';
import { Text, Image } from 'react-native';


import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
    
    return (
        <SafeAreaView style={{alignItems: "center", backgroundColor: "white"}}>
            
            <Text style={{marginBottom: 40}}> Welcome to the GoodTimes app</Text>
            
                

            <Text style={{fontSize: 20, marginTop: 10}}>Here you can find official events</Text>
            <Text>Go to the Events tab to search at your location!</Text>
            <Image 
                source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/0/01/Orange_Stage_%282012%29.jpg" }} 
                style={{ width: "100%", height: 180 }} />


            <Text style={{fontSize: 20, marginTop: 80}}>You can also find private events</Text>
            <Text> Go the the Posts tab to see the latest activity</Text> 
            <Image 
                source={{ uri: "https://c.tenor.com/QM-si3_EAyIAAAAC/listening-to-music-dancing.gif" }} 
                style={{ width: "100%", height: 180, marginBottom: 100 }} />   
        </SafeAreaView>
    );
}
