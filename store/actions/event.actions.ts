export interface EventQueryParams {
    offset? : number,
    categories? : string[],
    location? : string,
    isFree? : boolean
}

export function fetchEvents(queryParams : EventQueryParams) {
    return async function(dispatch : any, getState : any) {
        const offset = queryParams.offset ? "?" + "offset=" + queryParams.offset.toString() : "0"
        let queryString = offset;
        queryString += queryParams.location ? "&location=" + queryParams.location : "";
        queryString += queryParams.isFree ? "&is_free=" + queryParams.isFree : "";

        if (queryParams.categories) {
            queryString += "&categories="
            for (let i = 0; i < queryParams.categories.length; i++) {
                queryString += queryParams.categories[i];
                queryString += i + 1  !== queryParams.categories.length ? "," : "";
            }
        }

        
        
    }
}