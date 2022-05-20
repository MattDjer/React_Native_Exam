import { Comment } from "../../entities/Comment";
import { Post } from '../../entities/Post'
import { fetchPosts, fetchPost } from "./post.actions";
import { getDate } from "../../components/GetDate"


export const ADD_COMMENT = 'ADD_COMMENT';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';


export const addComment = (commentText: string, post: Post) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;
        const displayName = getState().user.loggedInUser.displayName       
        const email = getState().user.loggedInUser.email

        if (!commentText) {
            alert("Can't add an empty comment")
        }
        else {
            const currentDate = getDate()
            let userComment = new Comment(commentText, currentDate, email, "undefined") // id later fetched from firebase
            if (displayName) {
                userComment = new Comment(commentText, currentDate, email, "undefined", displayName)
            }
                    
            const response = await fetch(
                'https://react-native-firebase-27cc0-default-rtdb.europe-west1.firebasedatabase.app/posts/' + post.id + '/comments.json?auth=' + token, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    userComment                
                )
            });

            if (!response.ok) {
                alert("There was a problem creating the comment ")
            } else {
                dispatch(fetchComments(post.id))
            }
        }        
    };
}


export const fetchComments = (postId: string) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;

        const response = await fetch(
            'https://react-native-firebase-27cc0-default-rtdb.europe-west1.firebasedatabase.app/posts/' + postId + '/comments.json?auth=' + token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        if (!response.ok) {
            alert("Problem loading comments")
        } else {
            const data = await response.json();
            let comments: Comment[] = [];
        
            for (let CommentKey in data) {
                const obj = data[CommentKey];

                comments.push(new Comment(obj.text, 
                                          obj.timestamp,                                           
                                          obj.userMail,
                                          CommentKey, 
                                          obj.displayName,
                                        ))
            }         
            dispatch({ type: FETCH_COMMENTS, payload: comments })
            dispatch(fetchPosts())
            dispatch(fetchPost(postId))            
        }
    };
}