import { Comment } from "../../entities/Comment";
import { ADD_COMMENT, FETCH_COMMENTS } from "../actions/comment.actions";


interface ReduxState {
    comments: Comment[],
}

const initialState: ReduxState = {
    comments: [],
}

interface ReduxAction {
    type: string,
    payload: Comment | Comment[]
}

const commentReducer = (state: ReduxState = initialState, action: ReduxAction) => {
    switch (action.type) {
        case FETCH_COMMENTS: 
            return { ...state, comments: action.payload }
        case ADD_COMMENT:
            return { ...state, comments: [...state.comments, action.payload]}

        default:
            return state;
    }
};

export default commentReducer;