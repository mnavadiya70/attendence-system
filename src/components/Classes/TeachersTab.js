import React, { useEffect, useState, forwardRef } from 'react';
import Alert from '@material-ui/lab/Alert';
import MaterialTable from 'material-table';
import _ from 'lodash';
import TeacherService from '../../services/TeacherService';
import Loader from '../../loader/Loader';
import tableIcons from '../../shared/index';

function TeachersTab(props) {
    const { classCode } = props;
    const [teachers, setTeachers] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const [loading, setLoading] = useState(false);

    const headers = [
        // { field: 'key', title: 'Key', hidden: true },
        { field: 'FullName', title: "Name" },
        { field: 'Email', title: "Email" },
        // { field: 'uniqueCode', title: "Class unique code" },
        // {
        //     field: '', title: '', render: (rowData) =>
        //         rowData && (
        //             <IconButton onClick={() => handleOpenDialog(true, rowData)}>
        //                 <FaEye />
        //             </IconButton>
        //         )
        // }
    ];

    useEffect(() => {
        getTeachers();
    }, [])

    const getTeachers = () => {
        setLoading(true);
        let teachers = [];
        TeacherService.getTeachers()
            .then((res) => {
                let keys = Object.keys(res.data);
                keys.map((key) => {
                    if (res.data[key].ClassCode === classCode) {
                        teachers.push(res.data[key]);
                    }
                });
                setTeachers(teachers);
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
                data={teachers}
                columns={headers}
                icons={tableIcons}
                title=""
            />
        </>
    );

}

export default TeachersTab;