import Posts from "../../components/Posts";
import { Post } from "../../entities/Post";
import { FETCH_POSTS, POST_DETAILS } from "../actions/post.actions";


interface ReduxState {
    posts: Post[],
    post: Post[]
}

const initialState: ReduxState = {
    posts: [],
    post: []
}

interface ReduxAction {
    type: string,
    payload?: boolean | number | string | Post
}

const postReducer = (state: ReduxState = initialState, action: ReduxAction) => {
    switch (action.type) {

        case FETCH_POSTS:
            // create a new state object with the action.payload assigned to the POSTS array.
            return { ...state, posts: action.payload }

        case POST_DETAILS:
            return { ...state, post: action.payload}

        default:
            return state;
    }
};

export default postReducer;