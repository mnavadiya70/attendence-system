import axios from "../config/axios";

function createClass(data) {
  return axios.post('classes.json', data);
}

function updateClass(id, data) {
    return axios.put(`classes/${id}.json`, data);
}

function deleteClass(id) {
    return axios.delete(`classes/${id}.json`);
}

// function addUniqueCodes(data){
//     return axios.post('uniquecodes.json', data);
// }

function getClasses(){
    return axios.get('classes.json');
}

function getAbsentReasons(){
    return axios.get('AbsentReasons.json');
}

function markAttendances(classCode, subject, date, data){
    return axios.post(`Attendances/${classCode}/${subject}/${date}.json`, data);
}

export default {
    createClass,
    updateClass,
    deleteClass,
    // addUniqueCodes,
    getClasses,
    getAbsentReasons,
    markAttendances
};
