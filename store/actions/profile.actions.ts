import * as SecureStore from 'expo-secure-store';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { User } from '../../entities/User';
import { LOGIN, rehydrateUser, REHYDRATE_USER } from "./user.actions";
import uuid from "react-native-uuid";
import { manipulateAsync, FlipType, SaveFormat } from 'expo-image-manipulator';

export const IMAGE_UPLOAD_FAILED = "IMAGE_UPLOAD_FAILED";
export const UPDATE_PROFILE_FAILED = "UPDATE_PROFILE_FAILED";
export const CLEAR_MESSAGES = "CLEAR_MESSAGES";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";

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
            
            dispatch(rehydrateUser(newUser, data.idToken));
        }

    } 
}

export function updateProfileInfo(displayName : string, uri? : string | null ) {
    return async function (dispatch : any, getState : any) {

        
        const user = getState().user.loggedInUser;

        if ((user.displayName === displayName || displayName == "") && !uri) {
            return;
        }

        let photoUrl;

        if (uri) {
            try {
                photoUrl = await uploadImageAndGetUrl(uri);
                console.log("url 2: ", photoUrl);
            } 
            
            catch (error : any) {
                dispatch({type : IMAGE_UPLOAD_FAILED});    
            }

        }

        const request : any = {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
        }

        const requestBody : any = {
            displayName : displayName,
            returnSecureToken : true,
            idToken : await SecureStore.getItemAsync("idToken")
        }

        if (photoUrl) {
            requestBody.photoUrl = photoUrl;
        }

        request.body = JSON.stringify(requestBody);


        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDlO9g-z87u34DcKesUQmUJ81HqYsUXRqY", request);

        if (!response.ok) {
            //handle error
            console.log("changig profile info failed");
        }

        else {
            const data = await response.json();

            const newUser = new User(data.email, data.displayName, data.photoUrl);
            const idToken = data.idToken ? data.idToken : getState().user.idToken;

            await SecureStore.setItemAsync("idToken", idToken);
            await SecureStore.setItemAsync("user", JSON.stringify(newUser));
            
            dispatch(rehydrateUser(newUser, idToken));
        }
    }
}

async function uploadImageAndGetUrl(uri : string) {
    const resizedImage = await manipulateAsync(uri, [{resize : {height : 400, width : 400}}], {compress : 1, format : SaveFormat.PNG});
    uri = resizedImage.uri;
    
    const response = await fetch(uri);
    const blob = await response.blob();
    const storage = getStorage();
    const filename = uuid.v4().toString();
    const imageRef = ref(storage, filename);
    let url = "";

    await uploadBytesResumable(imageRef, blob);
    console.log('Uploaded a blob or file!');
    url = await getDownloadURL(imageRef)
    console.log("url: ", url);
    return url;
}