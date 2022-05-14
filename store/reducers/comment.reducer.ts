import { Comment } from "../../entities/Comment";
import { ADD_COMMENT, FETCH_COMMENTS } from "../actions/comment.actions";


interface ReduxState {
    comments: Comment[],
    comment: Comment[]
}

const initialState: ReduxState = {
    comments: [],
    comment: []
}

interface ReduxAction {
    type: string,
    payload?: boolean | number | string | Comment
}

const commentReducer = (state: ReduxState = initialState, action: ReduxAction) => {
    switch (action.type) {


        case FETCH_COMMENTS:
            // create a new state object with the action.payload assigned to the POSTS array.
            return { ...state, comments: action.payload }

        case ADD_COMMENT:
            return { ...state, comment: action.payload}

        default:
            return state;
    }
};

export default commentReducer;