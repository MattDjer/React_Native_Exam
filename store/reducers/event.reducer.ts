import { ADD_EVENTS } from "../actions/event.actions"

interface ReduxState {
    events : any[]
}

interface ReduxAction {
    type : string,
    payload : any 
}

const initialState : ReduxState = {
    events : []
}


const eventReducer = (state : ReduxState = initialState, action : ReduxAction) : ReduxState => {
    switch(action.type) {
        case ADD_EVENTS:
            return {...state, events : action.payload}
        default:
            return state;
    }
}

export default eventReducer;