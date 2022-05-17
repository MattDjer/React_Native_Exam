import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../App';
import EditProfileScreen from '../screens/EditProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import PostsScreen from '../screens/PostsScreen';
import PostDetails from '../screens/Details'
import Screen1 from './../screens/Screen1';
import Screen2 from './../screens/Screen2';
import Screen3 from './../screens/Screen3';
import { StackParamList } from "./../typings/navigations";
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import EventsScreen from '../screens/EventsScreen';


const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createBottomTabNavigator();

function ChatStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Screen1" component={Screen1} />
            <Stack.Screen name="Screen2" component={Screen2} />
            <Stack.Screen name="Screen3" component={Screen3} />
        </Stack.Navigator>
    );
}

function PostsStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Posts" component={PostsScreen}  />
            <Stack.Screen name="Details" component={PostDetails} />
        </Stack.Navigator>
    );
}

function ProfileStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen} options={{title : "Profile"}} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{title : "Edit profile"}} />
        </Stack.Navigator>
    )
}

export default function Navigation() {
    const user = useSelector((state: RootState) => state.user.loggedInUser)

    return (
        <NavigationContainer>
            {/* Move navigation related code to a seperate component that is used here */}
            {/* Determine if the user is logged in and display:
        A stack navigator (only) with signup and login // options={{ tabBarBadge: 3 }}
        Our "normal" app with tabs navigation */}
            {user !== null ? (
                // Show the app with all navigation
                <Tab.Navigator screenOptions={{ headerShown: false }}>
                        <Tab.Screen name="Home" component={HomeScreen} options={{title : "Home", tabBarIcon : () => (<AntDesign name="home" size={24} color="black" />)}}/>
                        <Tab.Screen name="Post" component={PostsStackNavigator} options={{title : "Posts", tabBarIcon : () => (<FontAwesome name="list-alt" size={24} color="black" />)}}/>
                        <Tab.Screen name="Discover" component={EventsScreen} options={{title : "Events"}}/> 
                        
                        <Tab.Screen name="Menu" component={ProfileStackNavigator} options={{title : "Profile", tabBarIcon : () => (<AntDesign name="user" size={24} color="black" />)}}/>
                </Tab.Navigator>
            ) : (
                // show a stack navigator with only signup and login screens.
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Signup" component={SignupScreen} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
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


  