import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* eventSaga() {
    yield takeLatest('GET_EVENTS', fetchEvents);
    yield takeLatest('GET_NEW_EVENT', fetchNewEvents);
    yield takeLatest('JOIN_EVENT', joinEvent);


}

//axios to GET all events from server
function* fetchEvents() {
    try {
        const response = yield axios.get('/api/events');
        console.log(':::::::::',response.data)
        yield put({ type: 'SET_EVENTS', payload: response.data })
    } catch (error) {
        console.log(error)
    }
}

//axios to GET new event from server
function* fetchNewEvents(action) {
    try {
        console.log('fetchNewEvents.......', action.payload)
        const newEventResponse = yield axios.get('/api/events/recent');
        console.log('.......', newEventResponse.data)
        // yield put({ type: 'SET_NEW_EVENT', payload: newEventResponse.data })
        yield put({ type: 'SET_EVENTS', payload: newEventResponse.data  })
    } catch (error) {
        console.log(error);
    }
}

function * joinEvent(action) {
    try {
        yield axios.post('/api/events/join', action.payload);
        yield put({ type: 'GET_NEW_EVENT' })
}
catch (err) {
        console.log(err)
}
}




export default eventSaga;