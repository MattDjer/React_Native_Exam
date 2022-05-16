import { useSelector } from "react-redux";
import { Post } from "../../entities/Post";
import { UserLike } from "../../entities/UserLike";


export const ADD_POST = 'ADD_POST';
export const UPDATE_POSTS = 'UPDATE_POSTS'
export const POST_DETAILS = 'POST_DETAILS'
export const ADD_LIKE = 'ADD_LIKE'


export const postDetails = (post: Post) => {
    return async (dispatch: any) => {
         dispatch({ type: POST_DETAILS, payload: post })
        }
    };


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
    
        if (!response.ok) {
            console.log("Problem fetching posts")
        } else {
            const data = await response.json(); // json to javascript
            let posts: Post[] = []
            
            for (const key in data) {
                // create Post objects and push them into the array posts.
                const obj = data[key];

                posts.push(new Post(obj.title, 
                                    obj.description, 
                                    obj.timestamp, 
                                    obj.userId, 
                                    obj.userMail, 
                                    obj.comments,
                                    obj.numberOfLikes,
                                    obj.userLikes,
                                    key,
                                    obj.displayName,
                                    ))
            }
            dispatch({ type: 'UPDATE_POSTS', payload: posts })
        }
    };
}


export const fetchPost = (postId: string) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;

        console.log("FETCHING POST!_______________________________________________")

        const response = await fetch(
            'https://react-native-firebase-27cc0-default-rtdb.europe-west1.firebasedatabase.app/posts/' + postId  + '/.json?auth=' + token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        if (!response.ok) {
            console.log("Problem fetching posts")
        } else {
            const data = await response.json(); // json to javascript

            let post = new Post(data.title, 
                                data.description, 
                                data.timestamp, 
                                data.userId, 
                                data.userMail, 
                                data.comments,
                                data.numberOfLikes,
                                data.userLikes,
                                postId,
                                data.displayName,
                                )                                    
                dispatch({ type: 'POST_DETAILS', payload: post })                                                     
        }
    };
}


export const createPost = (post: Post) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;
        post.displayName = getState().user.loggedInUser.displayName       
        post.userId = getState().user.localId;
        post.userMail = getState().user.loggedInUser.email //
        
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
            console.log("Failed to create post")
            //dispatch({type: ADD_CHATROOM_FAILED, payload: 'something'})
        } else {
            dispatch(fetchPosts())
        }
    };
}


export const addLikeToPost = (numberOfLikes: number, postId: string, isDetailsPage=false) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;
        const userMail = getState().user.loggedInUser.email 
        const userLike = new UserLike(userMail) 
        
        // Add userLike to post
        const responseUserLike = await fetch(
            'https://react-native-firebase-27cc0-default-rtdb.europe-west1.firebasedatabase.app/posts/'+ postId +'/userLikes.json?auth' + token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify(
                    userLike            
                )
        });
        if (!responseUserLike.ok) {
            console.log("Failed to add user to like")
        } 
        else {
            // Increment Number of likes
            const responseNumberOfLikes = await fetch(
                'https://react-native-firebase-27cc0-default-rtdb.europe-west1.firebasedatabase.app/posts/'+ postId +'/.json?auth=' + token, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify(
                        { "numberOfLikes" : numberOfLikes + 1 }       
                    )
                });
            if (!responseNumberOfLikes.ok) {
                console.log("Failed to increment likes")    
            }     
        }
        isDetailsPage ? dispatch(fetchPost(postId)) : dispatch(fetchPosts()) 
    }
}


export const removeLikeFromPost = (numberOfLikes: number, postId: string, isDetailsPage=false) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;
        const userMail = getState().user.loggedInUser.email //
        const displayName = getState().user.loggedInUser.displayName
        const userLike = new UserLike(userMail)   

        // Remove userLike from post
        const responseUserLike = await fetch(
            'https://react-native-firebase-27cc0-default-rtdb.europe-west1.firebasedatabase.app/posts/'+ postId +'/userLikes.json?auth' + token, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                userLike            
            )
        });
        if (!responseUserLike.ok) {
            console.log("Failed to remove user from like")
        }    
        else {    
        // Decrement Number of likes
            await fetch(
                'https://react-native-firebase-27cc0-default-rtdb.europe-west1.firebasedatabase.app/posts/'+ postId +'/.json?auth=' + token, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    { "numberOfLikes" : numberOfLikes - 1 }       
                )
            });
            if (!responseUserLike.ok) {
                console.log("Failed to decrement number of likes")
            }
        }
        isDetailsPage ? dispatch(fetchPost(postId)) : dispatch(fetchPosts()) 
    }
}
