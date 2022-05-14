import { User } from "../../entities/User";
import { LOGOUT, REHYDRATE_USER, SIGNUP, LOGIN } from "../actions/user.actions";

interface ReduxState {
    loggedInUser: User | null,
    idToken: string | undefined
}

const initialState: ReduxState = {
    loggedInUser: null,
    idToken: undefined
}

const userReducer = (state: ReduxState = initialState, action: any) => {
    switch (action.type) {
        case LOGOUT:
            return { ...state, loggedInUser: null, idToken: undefined, localId: undefined }
        case REHYDRATE_USER:
            return { ...state, loggedInUser: action.payload.user, idToken: action.payload.idToken}
        case SIGNUP:
            return { ...state, loggedInUser: action.payload.user, idToken: action.payload.idToken, 
                               localId: action.payload.localId, userMail: action.payload.userMail, 
                               username: action.payload.username }
        case LOGIN: 
            return { ...state, loggedInUser: action.payload.user, idToken: action.payload.idToken, 
                               localId: action.payload.localId, userMail: action.payload.userMail, 
                               displayName: action.payload.displayName }


        default:
            return state;
    }
};

export default userReducer;