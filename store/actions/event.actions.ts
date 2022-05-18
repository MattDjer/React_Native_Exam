export const ADD_EVENTS = "ADD_EVENTS";

export interface EventQueryParams {
    offset? : number,
    categories? : string[],
    location? : string,
    isFree? : boolean
}

export function fetchEvents(queryParams : EventQueryParams) {
    return async function(dispatch : any, getState : any) {
        const offset = queryParams.offset ? queryParams.offset.toString() : "0"
        let queryString = "?offset=" +  offset;
        queryString += queryParams.location ? "&location=" + queryParams.location : "";
        queryString += queryParams.isFree ? "&is_free=" + queryParams.isFree : "";

        if (queryParams.categories) {
            queryString += "&categories="
            for (let i = 0; i < queryParams.categories.length; i++) {
                queryString += queryParams.categories[i];
                queryString += i + 1  !== queryParams.categories.length ? "," : "";
            }
        }

        const url = "https://api.yelp.com/v3/events" + queryString;

        const request = {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + "t78Db5weOu36zqeM_2TOWiXlpeESNocdOQBPbozfVzXZmB8ZaftYY5SzLP2KABAiiXUZ6ea45KheWrSKT_AEOxAb0j6CueBin__Kf543l2_QmmLzxYUmrroNNd2DYnYx"
            }
        }

        const response = await fetch(url, request);

        if(!response.ok) {
            console.log("Error fetching events");
            console.log("Error data: ", await response.json());
        }

        else {
            const data = await response.json();
            console.log("Events fetched");
            console.log("Events: ", data);
            dispatch({type : ADD_EVENTS, payload : data.events});
            
        }
        
    }
}