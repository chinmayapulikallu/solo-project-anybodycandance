import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* deleteEventSaga() {
    yield takeLatest('DELETE_EVENT', deleteEvent);
}


function* deleteEvent(action) {
    try {
        console.log(':::::::::', action.payload)
         yield axios.delete(`/api/events/${action.payload}`);
         yield put({type: 'GET_EVENTS'});
    } catch (error) {
        console.log(error)
    }
}



export default deleteEventSaga;