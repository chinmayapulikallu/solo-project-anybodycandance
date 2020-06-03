import { combineReducers } from 'redux';
import Swal from 'sweetalert2'; 

// loginMessage holds the string that will display
// on the login screen if there's an error
const loginMessage = (state = '', action) => {
    switch (action.type) {
        case 'CLEAR_LOGIN_ERROR':
            return '';
        case 'LOGIN_INPUT_ERROR':
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Enter your username and password!',
            })
            return 'Enter your username and password!';
        case 'LOGIN_FAILED':
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Oops! The username and password didn\'t match. Please try again!',
            })
            return 'Oops! The username and password didn\'t match. Try again!';
        case 'LOGIN_FAILED_NO_CODE':
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Oops! Something went wrong! Is the server running?',
            })
            return 'Oops! Something went wrong! Is the server running?';
        default:
            return state;
    }
};

// registrationMessage holds the string that will display
// on the registration screen if there's an error
const registrationMessage = (state = '', action) => {
    switch (action.type) {
        case 'CLEAR_REGISTRATION_ERROR':
            return '';
        case 'REGISTRATION_INPUT_ERROR':
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Choose a username and password!',
            })
            return 'Choose a username and password!';
        case 'REGISTRATION_FAILED':
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Oops! That didn\'t work. The username might already be taken. Try again!',
            })
            return 'Oops! That didn\'t work. The username might already be taken. Try again!';
        default:
            return state;
    }
};

// make one object that has keys loginMessage, registrationMessage
// these will be on the redux state at:
// state.errors.loginMessage and state.errors.registrationMessage
export default combineReducers({
    loginMessage,
    registrationMessage,
});
