import axios from "axios"
import { useMutation, useQuery } from "react-query"
import { useSelector } from "react-redux"
import { Chatroom } from "../entities/Chatroom"

const baseUrl = 'https://cbscs-7a227-default-rtdb.europe-west1.firebasedatabase.app/'

export const usePostChatmessage = (chatroomId: string | undefined) => {
    const token = useSelector((state: any) => state.user.idToken)

    return useMutation((newChatmessage: any) => {
        // console.log("saving chatmessage", newChatmessage);

        return axios.post(baseUrl + '/chatrooms/' + chatroomId + '/chatmessages.json?auth=' + token, newChatmessage)
    })
}





export const usePostChatroom = () => {
    const token = useSelector((state: any) => state.user.idToken)

    return useMutation((newChatroom: Chatroom) => {
        return axios.post(baseUrl + '/chatrooms.json?auth=' + token, newChatroom)
    })
}


export const useGetChatrooms = () => {
    const token = useSelector((state: any) => state.user.idToken)

    const fetchTodoList = async () => {
        return await axios.get(baseUrl + '/chatrooms.json?auth=' + token)
    }

    const { isLoading, isError, data, error } = useQuery('chatrooms', fetchTodoList)
    let chatrooms: Chatroom[] = [];
    for (const key in data?.data) {
        const chatroom = data?.data[key];
        chatrooms.push(new Chatroom(chatroom.title, chatroom.status, chatroom.message, new Date(chatroom.timestamp), key))
    }

    return { isLoading, isError, chatrooms, error };
}