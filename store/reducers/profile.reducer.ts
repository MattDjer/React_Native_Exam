import { CLEAR_MESSAGES, IMAGE_UPLOAD_FAILED, UPDATE_PROFILE_FAILED, UPDATE_PROFILE_SUCCESS } from "../actions/profile.actions"

interface ReduxState {
    currentErrorMessage : string | null,
    successMessage : string | null
}

const initialState : ReduxState = {
    currentErrorMessage : null,
    successMessage : null
}

interface ReduxAction {
    type : string
}

const profileReducer = (state : ReduxState = initialState, action : ReduxAction) => {
    switch(action.type) {
        case CLEAR_MESSAGES:
            return {...state, currentErrorMessage : null, successMessage : null}
        case IMAGE_UPLOAD_FAILED:
            return {...state, currentErrorMessage : "Sorry, something went wrong uploading your new profile image", successMessage : null}
        case UPDATE_PROFILE_FAILED:
            return {...state, currentErrorMessage : "Something went wrong updating profile info", successMessage : null}
        case UPDATE_PROFILE_SUCCESS:
            return {...state, successMessage : "New profile info saved", currentErrorMessage : null}
        default:
            return state;
    }
}

export default profileReducer;