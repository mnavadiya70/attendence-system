import axiosInstance from "../config/axios";

function createClass(data) {
  return axiosInstance.post('classes.json', data);
}

function updateClass(id, data) {
    return axiosInstance.put(`classes/${id}.json`, data);
}

function deleteClass(id) {
    return axiosInstance.delete(`classes/${id}.json`);
}

// function addUniqueCodes(data){
//     return axiosInstance.post('uniquecodes.json', data);
// }

function getClasses(){
    return axiosInstance.get('classes.json');
}

export default {
    createClass,
    updateClass,
    deleteClass,
    // addUniqueCodes,
    getClasses
};
