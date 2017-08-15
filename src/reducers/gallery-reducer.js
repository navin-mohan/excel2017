const galleryReducer = (state={
    images:[],
    fetched: false,
    fetching: false
},action)=>{
    switch(action.type){
        case "FETCHING_IMAGES":
            return {
                ...state,
                fetching: true
            }
        case "FETCHED_IMAGES":
            return {
                ...state,
                fetching: false,
                fetched: true,
                images: action.payload
            }
        default:
            return state;
    }
}

export default galleryReducer;