import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


//Gets details of all dancers from server
function* fetchDancer() {
    try {
        const response = yield axios.get('/api/dancer');
        console.log(':::::::::', response.data)
        yield put({ type: 'FETCH_DANCERS', payload: response.data })
    } catch (err) {
        console.log(err)
    }
}

//deletes a dancer from the database 
function* deleteDancer(action) {
    try {
        console.log(':::::::::', action.payload)
        yield axios.delete(`/api/dancer/${action.payload}`);
        yield put({ type: 'GET_DANCERS' });
    } catch (error) {
        console.log(error)
    }
}

//create a new dancer and dispatch the details to the server
function* newDancer(action) {
    try {
        yield axios.post('/api/dancer', {
            user_id: action.payload.user_id,
            first_name: action.payload.first_name,
            last_name: action.payload.last_name,
            contact_number: action.payload.contact_number,
            email_id: action.payload.email_id,
            dance_style: action.payload.dance_style
        });
    } catch (err) {
        console.log(err)
    }
}


function* dancerSaga() {
    yield takeLatest('GET_DANCERS', fetchDancer);
    yield takeLatest('DELETE_DANCER', deleteDancer);
    yield takeLatest('SET_DANCER', newDancer);

}

export default dancerSaga;