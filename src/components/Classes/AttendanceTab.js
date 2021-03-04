import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Checkbox,
    InputLabel,
    Select,
    MenuItem
} from "@material-ui/core";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import _ from 'lodash';
import moment from 'moment';
import StudentService from '../../services/StudentService';
import ClassService from '../../services/ClassService';

function AttendanceDialog(props) {
    const { classCode } = props;
    const [students, setStudents] = useState([]);
    const [errorMessage, setErrorMessage] = useState();
    const [loading, setLoading] = useState(false);
    const [selectedGR, setSelectedGR] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState();
    const [absentReasons, setAbsentReasons] = useState([]);
    const [selectedReasons, setSelectedReasons] = useState([]);

    const subjects = [
        { label: "Hindi", value: "Hindi" },
        { label: "Gujarati", value: "Gujarati" },
        { label: "English", value: "English" },
        { label: "Science", value: "Science" },
        { label: "Maths", value: "Maths" }
    ];

    useEffect(() => {
        getStudents();
        getAbsentReasons();
    }, []);

    const getAbsentReasons = () => {
        ClassService.getAbsentReasons()
            .then((res) => {
                setAbsentReasons(res.data);
            })
            .catch();
    }

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

    const handleChangeCheck = (event, row) => {
        const selectedIndex = selectedGR.indexOf(row.GRNo);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected.push(row.GRNo);
            if (!_.isEmpty(selectedGR)) {
                setSelectedGR([...selectedGR, ...newSelected]);
            } else {
                setSelectedGR(newSelected);
            }
        } else if (selectedIndex > -1) {
            newSelected = selectedGR;
            newSelected.splice(selectedIndex, 1);
            setSelectedGR([...newSelected]);
        }
    }

    const handleChangeReason = (event, row) => {
        const selectedIndex = selectedReasons.findIndex(item => item.GRNo === row.GRNo);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected.push({ GRNo: row.GRNo, AbsentReason: event.target.value });
            if (!_.isEmpty(selectedReasons)) {
                setSelectedReasons([...selectedReasons, ...newSelected]);
            } else {
                setSelectedReasons(newSelected);
            }
        } else if (selectedIndex > -1) {
            newSelected = selectedReasons;
            newSelected[selectedIndex].AbsentReason = event.target.value;
            setSelectedReasons([...newSelected]);
        }
    }

    const handleChangeField = (event) => {
        const { name, value } = event.target;
        setSelectedSubject(value);
    }

    const handleSubmit = () => {
        let data = [];
        for (let i = 0; i < selectedGR.length; i++) {
            data.push({ GRNo: selectedGR[i], Present: true, AbsentReason: "" });
        }
        for (let i = 0; i < selectedReasons.length; i++) {
            data.push({ GRNo: selectedReasons[i].GRNo, Present: false, AbsentReason: selectedReasons[i].AbsentReason });
        }
        let date = moment(new Date()).format("MM-DD-yyyy");
        ClassService.markAttendances(classCode, selectedSubject, date, data)
            .then(res => {
                setSelectedGR([]);
                setSelectedReasons([]);
                setSelectedSubject();
            })
    }

    return (
        <>
        {/* // <Dialog onClose={() => props.handleClose()} aria-labelledby="customized-dialog-title"
        //     open={true}>
        //     <DialogTitle id="customized-dialog-title" onClose={() => props.handleClose()}>
        //         {props.classCode}
        //     </DialogTitle>
        //     <DialogContent> */}
                <InputLabel id="subject" name="subject">
                    <span aria-hidden="true" className="MuiFormLabel-asterisk Mui-error">*</span>Subject
                </InputLabel>
                <Select
                    labelId="Select Subject"
                    id="demo-simple-select-outlined"
                    name='subject'
                    value={selectedSubject || ''}
                    onChange={handleChangeField}
                    keyboardicon={<ArrowDropDownIcon />}
                    MenuProps={{
                        anchorOrigin: { vertical: "bottom", horizontal: "left" },
                        transformOrigin: { vertical: "top", horizontal: "left" },
                        getContentAnchorEl: null
                    }}
                    required={true}
                    error={null}
                >
                    {subjects.map((item, index) => {
                        return (
                            <MenuItem value={item.value} key={index} >{item.label}</MenuItem>
                        )
                    })}
                </Select>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="none"></TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">G.R.No.</TableCell>
                                <TableCell align="left">Absent Reason</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!_.isEmpty(students) ? (
                                students.length > 0 && students.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell scope="row" align="left" padding="checkbox">
                                            <Checkbox
                                                name="present"
                                                checked={selectedGR.indexOf(row.GRNo) !== -1}
                                                onClick={(e) => handleChangeCheck(e, row)}
                                                inputProps={{ "aria-labelledby": `enhanced-table-checkbox-${index}` }}
                                            />
                                        </TableCell>
                                        <TableCell scope="row" align="left">{row.FullName}</TableCell>
                                        <TableCell scope="row" align="left">{row.GRNo}</TableCell>
                                        <TableCell scope="row" align="left">
                                            <Select
                                                labelId="Select absent reason"
                                                id="demo-simple-select-outlined"
                                                name='absentReason'
                                                value={selectedReasons && selectedReasons.filter(item => item.GRNo === row.GRNo).AbsentReason}
                                                onChange={(e) => handleChangeReason(e, row)}
                                                keyboardicon={<ArrowDropDownIcon />}
                                                MenuProps={{
                                                    anchorOrigin: { vertical: "bottom", horizontal: "left" },
                                                    transformOrigin: { vertical: "top", horizontal: "left" },
                                                    getContentAnchorEl: null
                                                }}
                                                required={true}
                                                error={null}
                                            >
                                                {!_.isEmpty(absentReasons) && absentReasons.map((item, index) => {
                                                    return (
                                                        <MenuItem value={item} key={index} >{item}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                    <TableRow className="no-data-text">
                                        <TableCell className="no-data">No Data</TableCell>
                                    </TableRow>
                                )}
                        </TableBody>
                    </Table>
                </TableContainer>
            {/* // </DialogContent>
            // <DialogActions> */}
                <Button autoFocus onClick={handleSubmit}>Save</Button>
                {/* <Button autoFocus onClick={() => props.handleClose()}>Close</Button> */}
            {/* </DialogActions>
        </Dialog > */}
        </>
    );
}

export default AttendanceDialog;