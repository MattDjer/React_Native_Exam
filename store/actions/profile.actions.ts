import * as SecureStore from 'expo-secure-store';
import { User } from '../../entities/User';
import { REHYDRATE_USER } from "./user.actions";

export function updateEmail(email : string) {
    return async function(dispatch : any, getState : any) {
        
        const user = getState().user.loggedInUser;

        if (user.email === email) {
            // the new email is the same as the old one, so no need to request an email change
            return;
        }
        
        const request = {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body  : JSON.stringify({
                email : email,
                returnSecureToken : true,
                idToken : await SecureStore.getItemAsync("idToken")
            })
        }

        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDlO9g-z87u34DcKesUQmUJ81HqYsUXRqY", request);

        if (!response.ok) {
            //handle error
            console.log("change email failed");
        }

        else {
            console.log("email changed successfully");

            const data = await response.json();

            
            const newUser = new User(data.email, user.displayName, user.photoUrl);

            await SecureStore.setItemAsync("idToken", data.idToken);
            await SecureStore.setItemAsync("user", JSON.stringify(newUser));
            
            dispatch({type : REHYDRATE_USER, payload : {user : newUser, idToken : data.idToken, localId : data.localId}});
        }

    } 
}

export function updateProfileInfo(displayName : string) {
    return async function (dispatch : any, getState : any) {
        
        const user = getState().user.loggedInUser;
        
        if (user.displayName === displayName || displayName == "") {
            return;
        }

        const request = {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body  : JSON.stringify({
                displayName : displayName,
                returnSecureToken : true,
                idToken : await SecureStore.getItemAsync("idToken")
            })
        }

        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDlO9g-z87u34DcKesUQmUJ81HqYsUXRqY", request);

        if (!response.ok) {
            //handle error
            console.log("changig profile info failed");
        }

        else {
            console.log("profile info changed successfully");

            const data = await response.json();

            console.log("update profile: ", data);
            
            const newUser = new User(data.email, data.displayName, data.photoUrl);

            console.log("id token update: ", getState());

            await SecureStore.setItemAsync("idToken", data.idToken ? data.idToken : getState().user.idToken);
            await SecureStore.setItemAsync("user", JSON.stringify(newUser));
            
            dispatch({type : REHYDRATE_USER, payload : {user : newUser, idToken : data.idToken, localId : data.localId}});
        }
    }
}