import { Post } from "../../entities/Post";
import { UPDATE_POSTS, POST_DETAILS, ADD_POST } from "../actions/post.actions";


interface ReduxState {
    posts: Post[],
    post: Post[]
}

const initialState: ReduxState = {
    posts: [],
    post: [],
}

interface ReduxAction {
    type: string,
    payload: Post
}

let returnState

const postReducer = (state: ReduxState = initialState, action: ReduxAction) => {
    switch (action.type) {

        case UPDATE_POSTS:
            // create a new state object with the action.payload assigned to the POSTS array.
            return { ...state, posts: action.payload }

        case ADD_POST:
            returnState = { ...state }
            returnState.posts = [...returnState.posts, action.payload]
            return returnState

        case POST_DETAILS:
            return { ...state, post: action.payload}

        default:
            return state;
    }
};

export default postReducer;