import { Post } from "../../entities/Post";
import { UPDATE_POSTS, POST_DETAILS } from "../actions/post.actions";


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

const postReducer = (state: ReduxState = initialState, action: ReduxAction) => {
    switch (action.type) {

        case UPDATE_POSTS:
            return { ...state, posts: action.payload }

        case POST_DETAILS:
            return { ...state, post: action.payload}

        default:
            return state;
    }
};

export default postReducer;