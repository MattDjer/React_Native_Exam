import { Comment } from "../../entities/Comment";
import { Post } from '../../entities/Post'


export const ADD_COMMENT = 'ADD_COMMENT';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';


export const addComment = (comment: string, post: Post[]) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;
        const displayName = getState().user.loggedInUser.displayName       
        const email = getState().user.loggedInUser.email
        
        let userComment = new Comment(comment, new Date(), email)
        if (displayName) {
            userComment = new Comment(comment, new Date(), email, displayName)
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
            console.log("WHOE")
            //There was a problem..
            //dispatch({type: ADD_CHATROOM_FAILED, payload: 'something'})
        } else {
            const data = await response.json(); // json to javascript
            // let chatrooms = []
            // for (const key in data) {
            //     console.log(data[key].name)​
            // }

            //console.log("data from server", data);
            //post.id = data.name;

            dispatch({ type: ADD_COMMENT, payload: comment })
            
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
      
        //console.log(await response.json());
    
        if (!response.ok) {
            console.log("Problem fetching posts")
        } else {
            const data = await response.json(); // json to javascript
            let comments: Comment[] = []
        
            for (const key in data) {
                // create Post objects and push them into the array posts.
                const obj = data[key];

                comments.push(new Comment(obj.text, 
                                          obj.timestamp,                                           
                                          obj.userMail, 
                                          obj.displayName,
                                        ))
            }
                                        /*
                                         public text: string,
                                        public timestamp: Date, 
                                        public userMail: string, 
                                        public displayName?: string,
                                        public id?: string,
                                        */

            dispatch({ type: 'FETCH_COMMENTS', payload: comments })
        }
    };
}