import React, { useState, useEffect, forwardRef } from 'react';
import {
    // Link,
    // Table,
    // TableBody,
    // TableCell,
    // TableContainer,
    // TableRow,
    // Paper,
    // Checkbox,
    // TableHead,
    Tooltip,
    Button
} from "@material-ui/core";
// import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Alert from "@material-ui/lab/Alert";
// import Pagination from "@material-ui/lab/Pagination";
import _ from 'lodash';
import MaterialTable from 'material-table';
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from '@material-ui/icons/Check';
import { FaEye } from "react-icons/fa";
import tableIcons from '../../shared/index';
import Loader from '../../loader/Loader';
// import CustomTable from '../../UI/Table/Table';
import AssignTeacher from './AssignTeacher';
import AssignStudent from './AssignStudent';
import CommonDialog from './CommonDialog';
import ClassService from '../../services/ClassService';
import AttendanceDialog from './AttendanceDialog';

const Classes = () => {
    
    const [open, setOpen] = useState(false);
    const [classCodeForAttendance, setClassCodeForAttendance] = useState();
    const [openDialog, setOpenDialog] = useState(false);
    const [data, setData] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [openAssignTeacherDialog, setOpenAssignTeacherDialog] = useState(false);
    const [openAssignStudentDialog, setOpenAssignStudentDialog] = useState(false);
    const [codes, setUniqueCodes] = useState();
    const [loading, setLoading] = useState(false);
    const [classCode, setClassCode] = useState();

    const headers = [
        { field: 'key', title: 'Key', hidden: true },
        { field: 'standard', title: "Standard" },
        { field: 'division', title: "Division" },
        { field: 'uniqueCode', title: "Class unique code" },
        {
            field: '', title: 'View Details and mark attendance', render: (row) =>
                row && (
                    <IconButton onClick={() => handleOpenDialog(true, row)}>
                        <FaEye />
                    </IconButton>
                )
        },
        // {
        //     field: '', title: 'Mark Attendence', render: (row) =>
        //         row && (
        //             <IconButton onClick={() => handleOpenAttendanceDialog(true, row)}>
        //                 <CheckIcon />
        //             </IconButton>
        //         )
        // }
    ];

    useEffect(() => {
        getClasses();
    }, []);

    const getClasses = async () => {
        let classes = [];
        let codes = [];
        setLoading(true);
        await ClassService.getClasses()
            .then(res => {
                const keys = Object.keys(res.data);
                if (_.isEmpty(keys)) {
                    return;
                }
                else {
                    keys.map(key => {
                        classes.push({
                            key: key,
                            standard: res.data[key].Standard,
                            division: res.data[key].Division,
                            uniqueCode: res.data[key].UniqueCode
                        });
                        codes.push(res.data[key].UniqueCode);
                    })
                }
            })
            .catch(error => {
                setLoading(false);
            });
        setLoading(false);
        setUniqueCodes(codes);
        setData(classes);
    }

    const handleOpenDialog = (value, row) => {
        setOpenDialog(value);
        setClassCode(row.uniqueCode);
    }

    const handleOpenAttendanceDialog = (value, row) => {
        setOpen(value);
        setClassCodeForAttendance(row.uniqueCode);
    }

    const handleRowAdd = (newData, resolve) => {
        let errorList = []
        validateFields(newData, errorList);
        if (errorList.length < 1) {
            const postData = {
                Standard: newData.standard,
                Division: newData.division,
                UniqueCode: newData.uniqueCode
            }
            ClassService.createClass(postData);
            let dataToAdd = [...data];
            dataToAdd.push(newData);
            setData(dataToAdd);
            resolve()
        } else {
            setErrorMessage(errorList);
            resolve()
        }

        setTimeout(() => {
            setErrorMessage("");
        }, 3000);
    }

    const handleRowUpdate = (newData, oldData, resolve) => {
        let errorList = []
        validateFields(newData, errorList);
        if (errorList.length < 1) {
            const postData = {
                Standard: newData.standard,
                Division: newData.division,
                UniqueCode: newData.uniqueCode
            }
            ClassService.updateClass(oldData.key, postData);
            let dataToUpdate = [...data];
            const index = oldData.tableData.id;
            dataToUpdate[index] = newData;
            setData(dataToUpdate);
            resolve()
        } else {
            setErrorMessage(errorList);
            resolve()
        }

        setTimeout(() => {
            setErrorMessage("");
        }, 3000);
    }

    const handleRowDelete = (oldData, resolve) => {
        ClassService.deleteClass(oldData.key);
        const newData = [...data];
        const index = oldData.tableData.id;
        newData.splice(index, 1);
        setData(newData);
        resolve()
    }

    const validateFields = (newData, errorList) => {
        if (newData.standard === undefined) {
            errorList.push("Standard is required")
        }
        if (newData.division === undefined) {
            errorList.push("Division is required")
        }
        if (newData.uniqueCode === undefined) {
            errorList.push("Unique Code is required")
        }
        if (data.some(x =>
            (x.standard === newData.standard &&
                x.division === newData.division &&
                x.uniqueCode === newData.uniqueCode))) {
            errorList.push("This combination already exists for this class");
            return;
        }
        // else if (data.some(x =>
        //     ((x.standard !== newData.standard ||
        //         x.division !== newData.division) &&
        //         x.uniqueCode === newData.uniqueCode))) {
        //     errorList.push("This combination already exists for this class");
        //     return;
        // }
        else if (data.some(x =>
            (x.standard === newData.standard &&
                x.division === newData.division &&
                x.uniqueCode !== newData.uniqueCode))) {
            errorList.push("This combination already exists for this class");
            return;
        }
        else if (data.some(x =>
            ((x.standard !== newData.standard &&
                x.division === newData.division) ||
                (x.standard === newData.standard &&
                    x.division !== newData.division) &&
                x.uniqueCode === newData.uniqueCode))) {
            errorList.push("This unique code already exists");
            return;
        }
    }
    return (
        <>
            {!_.isEmpty(errorMessage) &&
                <Alert severity="error">
                    {errorMessage.map((msg, i) => {
                        return <p key={i}>{msg}</p>
                    })}
                </Alert>
            }
            {/* <Tooltip
                title="Assign teacher"
                onClose={() => handleTooltipOpen(false)}
                onOpen={() => handleTooltipOpen(true)}
                open={open}
            > */}
                <button onClick={() => setOpenAssignTeacherDialog(true)}>
                    Assign Teacher
                </button>
                <button onClick={() => setOpenAssignStudentDialog(true)}>
                    Assign Students
                </button>
            {/* </Tooltip> */}
            <Loader loading={loading}/>
            <MaterialTable
                data={data}
                columns={headers}
                icons={tableIcons}
                title="Classes"
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            handleRowUpdate(newData, oldData, resolve);
                        }),
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            handleRowAdd(newData, resolve)
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            handleRowDelete(oldData, resolve)
                        }),
                }} />
            <AssignTeacher open={openAssignTeacherDialog} handleClose={() => setOpenAssignTeacherDialog(false)} codes={codes} />
            <AssignStudent open={openAssignStudentDialog} handleClose={() => setOpenAssignStudentDialog(false)} codes={codes} />
            <CommonDialog open={openDialog} handleClose={() => setOpenDialog(false)} classCode={classCode}/>
            <AttendanceDialog open={open} handleClose={() => setOpen(false)} classCode={classCodeForAttendance}/>
        </>
    );
}

export default Classes;