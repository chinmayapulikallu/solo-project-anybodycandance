import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import eventSaga from './eventSaga';
import postEventSaga from './postEventSaga';
import dancerSaga from  './dancerSaga';
import newDancerSaga from './newDancerSaga';
import deleteEventSaga from './deleteEventSaga';
import deleteDancerSaga from './deleteDancerSaga';
import updateEventSaga from './updateEventSaga';




// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
    yield all([
        loginSaga(),
        registrationSaga(),
        userSaga(),
        eventSaga(),
        postEventSaga(),
        dancerSaga(),
        newDancerSaga(),
        deleteEventSaga(),
        deleteDancerSaga(),
        updateEventSaga()
    ]);
}