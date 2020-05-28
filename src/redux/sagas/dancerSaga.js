import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchDancer() {
    try {
        const response = yield axios.get('/api/dancers');
        console.log(':::::::::', response.data)
        yield put({ type: 'FETCH_DANCERS', payload: response.data })
    } catch (err) {
        console.log(err)
    }
}

function* dancerSaga() {
    yield takeLatest('GET_DANCERS', fetchDancer);
}

export default dancerSaga;