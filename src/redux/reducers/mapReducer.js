const mapReducer = (state = { latitude: 44.9778 , longitude:-93.2650}, action) => {
    if (action.type === 'SET_MAP') {
        console.log('Map Reducer Reducer----->', action.payload);
        return action.payload;
    }
    return state
}


export default mapReducer;