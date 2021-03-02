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
    // Button
} from "@material-ui/core";
// import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Alert from "@material-ui/lab/Alert";
// import Pagination from "@material-ui/lab/Pagination";
import _ from 'lodash';
import MaterialTable from 'material-table';
import IconButton from "@material-ui/core/IconButton";
import { FaEye, FaUserPlus, FaUser } from "react-icons/fa";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Loader from '../../loader/Loader';
// import CustomTable from '../../UI/Table/Table';
import CreateClass from '../../components/Classes/CreateClass'
import ClassService from '../../services/ClassService';

const Classes = () => {
    const headers = [
        { field: 'key', title: 'Key', hidden: true },
        { field: 'standard', title: "Standard" },
        { field: 'division', title: "Division" },
        { field: 'uniqueCode', title: "Class unique code" },
        {
            field: '', title: '', render: (rowData) =>
                rowData && (
                    <IconButton onClick={() => console.log(rowData)}>
                        <FaEye />
                    </IconButton>
                )
        }
    ];

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };

    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [data, setData] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [openAssignTeacherDialog, setOpenAssignTeacherDialog] = useState(false);
    // const [codes, setUniqueCodes] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getClasses();
    }, []);

    const getClasses = async () => {
        let classes = [];
        // let codes = [];
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
                        // codes.push(res.data[key].UniqueCode);
                    })
                }
            })
            .catch(error => {
                setLoading(false);
            });
        setLoading(false);
        // setUniqueCodes(codes);
        setData(classes);
    }

    const handleTooltipOpen = (value) => {
        setOpen(value);
    };

    const handleOpenDialog = (value) => {
        setOpenDialog(value);
        if (value === false)
            getClasses();
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
            <Tooltip
                title="Assign teacher"
                onClose={() => handleTooltipOpen(false)}
                onOpen={() => handleTooltipOpen(true)}
                open={open}
            >
                <IconButton onClick={() => setOpenAssignTeacherDialog(true)}>
                    <FaUserPlus />
                </IconButton>
            </Tooltip>
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
            {/* {loading ? <Loader loading={true} /> : <CustomTable headers={headers} data={data} />} */}
            <CreateClass open={openDialog} handleClose={handleOpenDialog} data={data} />
        </>
    );
}

export default Classes;