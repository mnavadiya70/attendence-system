import axios from '../config/axios';

function assignTeacher(data){
    return axios.post('/teachers.json', data);
}

function getTeachers(){
    return axios.get('/teachers.json');
}

export default {
    assignTeacher,
    getTeachers
}