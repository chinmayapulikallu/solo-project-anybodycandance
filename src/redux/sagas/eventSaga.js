import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchEvent() {
    try {
        const response = yield axios.get('/api/events');
        console.log(':::::::::',response.data)
        yield put({ type: 'SET_EVENTS', payload: response.data })
    } catch (err) {
        console.log(err)
    }
}

function* eventSaga() {
    yield takeLatest('GET_EVENTS', fetchEvent);
}

export default eventSaga;