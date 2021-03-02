import Utils from '../helper/Utils';
import axiosInstance from '../config/axios';

function getCurrentUser() {
    return Utils.getDataFromStorage('user');
}

// Service to register user
function registerUser(body) {
    return true;
}

function login() {
    return axiosInstance.get('User.json');
}

export default {
    getCurrentUser,
    registerUser,
    login,
}
