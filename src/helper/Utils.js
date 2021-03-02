export default class Utils {

    static getDataFromStorage = (value) => {
        if (localStorage.getItem(value)) {
            var object = JSON.parse(atob(localStorage.getItem(value)));
            if(value === "user"){
                return object;
            }
            else{
                return null;
            }
        } else {
            return null;
        }
    }

    static addDataToStorage = (key, value) => {
        if (key && (value || value === '')) {
            const encodedValue = window.btoa(unescape(encodeURIComponent(JSON.stringify(value))));
            localStorage.setItem(key, encodedValue);
        }
    }

    // Function to validate the email address
    // static validateEmail = (email) => {
    //     var pattern = /^[a-zA-Z0-9\-_]+(\.[a-zA-Z0-9\-_]+)*@[a-z0-9]+(\-[a-z0-9]+)*(\.[a-z0-9]+(\-[a-z0-9]+)*)*\.[a-z]{2,4}$/;
    //     if (pattern.test(email)) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // Use to validate the password
    // static validatePassword = (password) => {
    //     var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    //     if (pattern.test(password)) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // Function to check property for null or empty
    static checkProperties = (obj) => {
        for (var key in obj) {
            if (obj[key] === null || obj[key] === "" || obj[key] === undefined)
                return false;
        }
        return true;
    }

    static checkGetPropertiesName = (obj) => {
        const emptyList = Object.keys(obj).filter(key => obj[key] === null || obj[key] === undefined || obj[key] === "")
        return emptyList;
    }

}
