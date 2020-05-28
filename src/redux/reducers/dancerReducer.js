const dancerReducer = (state = [], action) => {
    if (action.type === 'FETCH_DANCERS') {
        console.log('dancer Reducer----->', action.payload);
        return action.payload;
    }
    return state
}


export default dancerReducer;