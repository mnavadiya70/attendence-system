import axios from 'axios';
import { config } from './config';

const service = axios.create({
    baseURL: config.API_URL,
    timeout: 5000
});

service.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.clear();
            window.location.replace('/');
            return error.response.status;
        }
        alert(error);
        console.error(error);
        return Promise.reject(error);
    })

export default service;