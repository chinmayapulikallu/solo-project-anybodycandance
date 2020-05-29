import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';


function* deleteDancerSaga() {
    yield takeLatest('DELETE_DANCER', deleteDancer);
}


function* deleteDancer(action) {
    try {
        console.log(':::::::::', action.payload)
        yield axios.delete(`/api/dancers/${action.payload}`);
    } catch (error) {
        console.log(error)
    }
}



export default deleteDancerSaga;