import { Post } from "../../entities/Post";
import { FETCH_POSTS } from "../actions/post.actions";


interface ReduxState {
    posts: Post[]
}

const initialState: ReduxState = {
    posts: [],
}

interface ReduxAction {
    type: string,
    payload?: boolean | number | string | Post
}

const postReducer = (state: ReduxState = initialState, action: ReduxAction) => {
    switch (action.type) {
        
        case FETCH_POSTS:
            console.log("FETCHING POSTS")
            // create a new state object with the action.payload assigned to the chatrooms array.
            return { ...state, posts: action.payload }

        default:
            return state;
    }
};

export default postReducer;