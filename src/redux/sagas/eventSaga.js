import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* eventSaga() {
    yield takeLatest('GET_EVENTS', fetchEvents);
    yield takeLatest('GET_NEW_EVENT', fetchNewEvents);

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
function* fetchNewEvents() {
    try {
        const newEventResponse = yield axios.get('/api/events/recent');
        console.log('.......', newEventResponse.data)
        // yield put({ type: 'SET_NEW_EVENT', payload: newEventResponse.data })
        yield put({ type: 'SET_EVENTS', payload: newEventResponse.data  })
    } catch (error) {
        console.log(error);
    }
}


export default eventSaga;