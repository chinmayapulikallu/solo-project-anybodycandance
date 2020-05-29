import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* eventSaga() {
    yield takeLatest('GET_EVENTS', fetchEvents);
}

function* fetchEvents() {
    try {
        const response = yield axios.get('/api/events');
        console.log(':::::::::',response.data)
        yield put({ type: 'SET_EVENTS', payload: response.data })
    } catch (err) {
        console.log(err)
    }
}


export default eventSaga;