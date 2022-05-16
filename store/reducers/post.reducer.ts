import Posts from "../../components/Posts";
import { Post } from "../../entities/Post";
import { UPDATE_POSTS, POST_DETAILS, ADD_POST, ADD_LIKE } from "../actions/post.actions";


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
            console.log(action.payload)
            return { ...state, post: action.payload}

        case ADD_LIKE:
            console.log("WHAT IS ACTION PAYLOAD?")
            console.log(action.payload)
            
            /*console.log("ADD LIKE")
            returnState = { ...state }
            console.log(returnState)
            for (let post of returnState.posts) {
                console.log("WHAT IS POST")
                console.log(post)
                const postId = String(post.id)
                if (postId == action.payload) {
                    console.log("ID FOUND")
                    post.userLikes = action.payload.userLikes
                    post.numberOfLikes++
                }
            }    
            //console.log(returnState)
            return returnState
            */
        default:
            return state;
    }
};

export default postReducer;