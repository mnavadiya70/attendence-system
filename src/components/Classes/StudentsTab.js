import React, { useEffect, useState, forwardRef } from 'react';
import Alert from '@material-ui/lab/Alert';
import MaterialTable from 'material-table';
import _ from 'lodash';
import StudentService from '../../services/StudentService';
import Loader from '../../loader/Loader';
import tableIcons from '../../shared/index';

function StudentsTab(props) {
    const { classCode } = props;
    const [students, setStudents] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const [loading, setLoading] = useState(false);

    const headers = [
        // { field: 'key', title: 'Key', hidden: true },
        { field: 'FullName', title: "FullName" },
        { field: 'Phone', title: "Phone" },
        { field: 'Address', title: "Address" },
        { field: 'DateOfBirth', title: "DateOfBirth" },
        { field: 'GRNo', title: "General Register No." }
    ];

    useEffect(() => {
        getStudents();
    }, [])

    const getStudents = () => {
        setLoading(true);
        let students = [];
        StudentService.getStudents(classCode)
            .then((res) => {
                let keys = Object.keys(res.data);
                keys.map((key) => {
                    students.push(res.data[key]);
                });
                setStudents(students);
                setLoading(false);
            })
            .catch((error) => {
                setErrorMessage(error);
                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
                setLoading(false);
            });
    }

    return (
        <>
            <Loader loading={loading} />
            { !_.isEmpty(errorMessage) && <Alert severity="error">{errorMessage}</Alert>}
            <MaterialTable
                data={students}
                columns={headers}
                icons={tableIcons}
                title=""
            />
        </>
    );

}

export default StudentsTab;