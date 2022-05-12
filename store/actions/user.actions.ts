import * as SecureStore from 'expo-secure-store';
import { FirebaseSignupSuccess, FirebaseLoginSuccess } from "../../entities/FirebaseSignupSuccess";
import { User } from '../../entities/User';


export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const REHYDRATE_USER = 'REHYDRATE_USER';
export const LOGOUT = 'LOGOUT';

export const rehydrateUser = (user: User, idToken: string) => {
    return { type: REHYDRATE_USER, payload: { user, idToken } }
}


export const login = (email: string, password: string) => {
    return async (dispatch: any, getState: any) => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDlO9g-z87u34DcKesUQmUJ81HqYsUXRqY', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        console.log("RESPONSE : " + response.json());

        if (!response.ok) {
            console.log("There was a problem login in")
            //dispatch({type: SIGNUP_FAILED, payload: 'something'})
        } else {
            const data: FirebaseLoginSuccess = await response.json(); // json to javascript
            console.log("data from server", data);

            const user = new User(data.email, '', '');

            await SecureStore.setItemAsync('idToken', data.idToken);
            await SecureStore.setItemAsync('user', JSON.stringify(user)); // convert user js-obj. to json

            dispatch({ type: LOGIN, payload: { user, idToken: data.idToken } })
        }
    }
}


export const signup = (email: string, password: string) => {
    return async (dispatch: any, getState: any) => {
        //const token = getState().user.token; // if you have a reducer named user(from combineReducers) with a token variable​

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDlO9g-z87u34DcKesUQmUJ81HqYsUXRqY', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ //javascript to json
                //key value pairs of data you want to send to server
                // ...
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        // console.log(response.json());

        if (!response.ok) {
            //There was a problem..
            //dispatch({type: SIGNUP_FAILED, payload: 'something'})
        } else {
            const data: FirebaseSignupSuccess = await response.json(); // json to javascript
            console.log("data from server", data);

            const user = new User(data.email, '', '');

            await SecureStore.setItemAsync('idToken', data.idToken);
            await SecureStore.setItemAsync('user', JSON.stringify(user)); // convert user js-obj. to json

            dispatch({ type: SIGNUP, payload: { user, idToken: data.idToken } })
        }
    };
};

export const logout = () => {
    SecureStore.deleteItemAsync('idToken');
    SecureStore.deleteItemAsync('user');

    return { type: LOGOUT }
}
