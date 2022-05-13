
export const ADD_COMMENT = 'ADD_COMMENT';


export const addComment = (comment: any) => {
    return async (dispatch: any, getState: any) => {
        const token = getState().user.idToken;
        const userId = getState().user.localId;
  
        console.log(comment)
        //delete chatroom.id // for an update, this would remove the id attribute (and value) from the chatroom
        const response = await fetch(
            'https://react-native-firebase-27cc0-default-rtdb.europe-west1.firebasedatabase.app/comments.json?auth=' + token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                comment                
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