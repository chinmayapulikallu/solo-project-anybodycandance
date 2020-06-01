import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';

function* newDancer(action) {
    try {
        yield axios.post('/api/dancers', {
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

function* newDancerSaga() {
    yield takeLatest('SET_DANCER', newDancer);
}

export default newDancerSaga;