import axios from '../config/axios';

function getStudents(classCode){
    return axios.get(`students/${classCode}.json`);
}

function assignStudent(classCode, data){
    return axios.post(`students/${classCode}.json`, data);
}

export default {
    getStudents,
    assignStudent
}