import axios from '../config/axios';

function createTeacher(data){
    return axios.post('/teachers.json', data);
}

function getTeachers(){
    return axios.get('/teachers.json');
}

export default {
    createTeacher,
    getTeachers
}