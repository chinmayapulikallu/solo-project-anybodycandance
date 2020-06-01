const eventReducer = (state = [], action) => {
    if (action.type === 'SET_EVENTS') {
        console.log('event Reducer----->',action.payload);
        return action.payload;
    }
    //} else if (action.type === 'SET_NEW_EVENT') {
    //     console.log('new event Reducer----->', action.payload);
    //     return action.payload;
    // }
        return state
    }
        



export default eventReducer;