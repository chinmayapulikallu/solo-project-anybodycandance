import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* deleteDancerSaga() {
    yield takeLatest('DELETE_DANCER', deleteDancer);
}


function* deleteDancer(action) {
    try {
        console.log(':::::::::', action.payload)
        yield axios.delete(`/api/dancers/${action.payload}`);
        yield put({ type: 'GET_DANCERS' });
    } catch (error) {
        console.log(error)
    }
}



export default deleteDancerSaga;