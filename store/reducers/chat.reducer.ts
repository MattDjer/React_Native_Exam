import { Chatroom } from "../../entities/Chatroom";
import { Post } from "../../entities/Post";
import { ADD_CHATROOM, FETCH_CHATROOMS, TOGGLE_HAPPY } from "../actions/chat.actions";
import { FETCH_POSTS } from "../actions/post.actions"

interface ReduxState {
    posts: Post[]
    chatrooms: Chatroom[]
    isHappy: boolean
    counter: number
    name: string
}

const initialState: ReduxState = {
    posts: [],
    chatrooms: [],
    isHappy: false,
    counter: 0,
    name: "Peter"
}

interface ReduxAction {
    type: string,
    payload?: boolean | number | string | Chatroom
}

const chatReducer = (state: ReduxState = initialState, action: ReduxAction) => {
    switch (action.type) {
        case TOGGLE_HAPPY:
            console.log("hi123");

            return { ...state, isHappy: !state.isHappy }

        case ADD_CHATROOM:
            console.log("hi \n\n" + action.payload);
            return { ...state, chatrooms: [...state.chatrooms, action.payload] }
        // state.chatrooms.push(chatroom) // mutating state. Not allowed

        case FETCH_CHATROOMS:
            console.log("FETCHING POSTS")
            // create a new state object with the action.payload assigned to the chatrooms array.
            return { ...state, chatrooms: action.payload }


        default:
            return state;
    }
};

export default chatReducer;