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


        if (!response.ok) {
            alert("Wrong username or password");
        } else {
            const data: FirebaseLoginSuccess = await response.json(); // json to javascript            
            
            let user = new User(data.email, '', '');
            if (data.displayName) {
                user = new User(data.email, data.displayName, '');
            }

            await SecureStore.setItemAsync('idToken', data.idToken);
            await SecureStore.setItemAsync('localId', data.localId);
            await SecureStore.setItemAsync('user', JSON.stringify(user)); // convert user js-obj. to json

            dispatch({ type: LOGIN, payload: { user, 
                                               idToken: data.idToken, 
                                               localId: data.localId, 
                                                } })
        }
    }
}


export const signup = (email: string, password: string) => {
    return async (dispatch: any, getState: any) => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDlO9g-z87u34DcKesUQmUJ81HqYsUXRqY', {
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

        if (!response.ok) {
            alert("User already exists with that email");
        } else {
            const data: FirebaseSignupSuccess = await response.json();
            const user = new User(data.email, '', '');

            await SecureStore.setItemAsync('idToken', data.idToken);
            await SecureStore.setItemAsync('user', JSON.stringify(user));        

            dispatch({ type: SIGNUP, payload: { user, idToken: data.idToken, localId: data.localId } })
        }
    };
};


export const logout = () => {
    SecureStore.deleteItemAsync('idToken');
    SecureStore.deleteItemAsync('user');

    return { type: LOGOUT }
}
