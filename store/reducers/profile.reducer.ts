import { RootState } from "../../App";
import { RESET_UPDATE_STATUS, UPDATE_PROFILE_FAILED, UPDATE_PROFILE_SUCCESS } from "../actions/profile.actions"

export const UPDATE_DEFAULT = "UPDATE_DEFAULT";

interface ReduxState {
    currentErrorMessage : string | null,
    successMessage : string | null,
    updateProfileStatus : string;
}

const initialState : ReduxState = {
    currentErrorMessage : null,
    successMessage : null,
    updateProfileStatus : UPDATE_DEFAULT
}

interface ReduxAction {
    type : string
}

const profileReducer = (state : ReduxState = initialState, action : ReduxAction) : ReduxState => {
    switch(action.type) {
        case RESET_UPDATE_STATUS:
            return {...state, updateProfileStatus : UPDATE_DEFAULT}
        case UPDATE_PROFILE_FAILED:
            return {...state, updateProfileStatus : UPDATE_PROFILE_FAILED}
        case UPDATE_PROFILE_SUCCESS:
            return state.updateProfileStatus === UPDATE_DEFAULT ? {...state, updateProfileStatus : UPDATE_PROFILE_SUCCESS} : state; 
        default:
            return state;
    }
}

export default profileReducer;