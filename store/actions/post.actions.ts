import { Post } from "../../entities/Post";


export const ADD_POST = 'ADD_POST';
export const FETCH_POSTS = 'FETCH_POSTS'


export const fetchPosts = () => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;

        const response = await fetch(
            'https://react-native-firebase-27cc0-default-rtdb.europe-west1.firebasedatabase.app/posts.json?auth=' + token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
      
        //console.log(await response.json());
    
        if (!response.ok) {
            console.log("Problem fetching posts")
            //There was a problem..
            //dispatch({type: FETCH_CHATROOM_FAILED, payload: 'something'})
        } else {
            const data = await response.json(); // json to javascript
            let posts: Post[] = []
           
            for (const key in data) {
                // create Post objects and push them into the array posts.
                const obj = data[key];
                posts.push(new Post(obj.title, obj.description, obj.timestamp, obj.userId))
            }

            console.log("data from server " +  posts);
            
            console.log("dispatching")
            dispatch({ type: 'FETCH_POSTS', payload: posts })
        }
    };
}



export const createPost = (post: Post) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;
        const userId = getState().user.localId;

        post.userId = userId
        console.log(post)
        //delete chatroom.id // for an update, this would remove the id attribute (and value) from the chatroom
        const response = await fetch(
            'https://react-native-firebase-27cc0-default-rtdb.europe-west1.firebasedatabase.app/posts.json?auth=' + token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                post                
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

            dispatch({ type: ADD_POST, payload: post })
        }
    };
}