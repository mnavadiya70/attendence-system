import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid, Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@material-ui/core";
import _ from 'lodash';
import moment from 'moment';
import Alert from "@material-ui/lab/Alert";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import TextField from '../../UI/TextField/TextField';
import StudentService from '../../services/StudentService'

function AssignStudent(props) {
    const fields = {
        firstName: "",
        lastName: "",
        classCode: "",
        phone: "",
        address: "",
        dateOfBirth: "",
        errors: {
            firstName: null,
            lastName: null,
            classCode: null,
            phone: null,
            address: null,
            dateOfBirth: null
        }
    }
    const [assignStudentFields, setAssignStudentFields] = useState(fields);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChangeField = (event) => {
        const { name, value } = event.target;

        let updFields = { ...assignStudentFields, [name]: value };

        if (name in updFields.errors) {
            updFields = {
                ...updFields,
                errors: {
                    ...updFields.errors,
                    [name]: !value || value === "" ? true : false,
                }
            }
        }
        setAssignStudentFields(updFields);
    }

    const handleSubmit = (e) => {
        let error = false;
        let updFields = { ...assignStudentFields };
        // validate data
        for (const [key, value] of Object.entries(updFields.errors)) {
            if (updFields[key] === "" || !updFields[key]) {
                error = true;
                updFields.errors[key] = true;
            }
        }

        if (error) {
            setErrorMessage("Please fill all required fields");
            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
            return false;
        }

        const postData = {
            FirstName: assignStudentFields.firstName,
            LastName: assignStudentFields.lastName,
            FullName: assignStudentFields.firstName + " " + assignStudentFields.lastName,
            Phone: assignStudentFields.phone,
            Address: assignStudentFields.address,
            DateOfBirth: assignStudentFields.dateOfBirth,
            GRNo: Math.floor(Math.random() * 10000) + 1
        }

        StudentService.assignStudent(assignStudentFields.classCode, postData)
            .then((res) => {
                setAssignStudentFields(fields);
                props.handleClose();
            })
            .catch((error) => {
                setErrorMessage(error);
                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
            });
    }

    // const minDate = moment(new Date().toLocaleDateString()).add(7, "year");
    return (
        <div>
            <Dialog onClose={() => props.handleClose()} aria-labelledby="customized-dialog-title"
                open={props.open}>
                <DialogTitle id="customized-dialog-title" onClose={() => props.handleClose()}>
                    Create Class
                </DialogTitle>
                <DialogContent>
                    {!_.isEmpty(errorMessage) && (
                        <p><Alert severity="error">{errorMessage}</Alert></p>
                    )}
                    <Grid container>
                        <Grid item sm={12}>
                            <Grid container spacing={6}>
                                <Grid item sm={6}>
                                    <TextField name="firstName" value={assignStudentFields.firstName} onchange={handleChangeField} label="First Name" required={true} error={assignStudentFields.errors.firstName} type="text"/>
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField name="lastName" value={assignStudentFields.lastName} onchange={handleChangeField} label="Last Name" required={true} error={assignStudentFields.errors.lastName} type="text"/>
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField name="phone" value={assignStudentFields.phone} onchange={handleChangeField} label="Phone" required={true} error={assignStudentFields.errors.phone} type="number"/>
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField name="address" value={assignStudentFields.address} onchange={handleChangeField} label="Address" required={true} error={assignStudentFields.errors.Address} type="text"/>
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField name="dateOfBirth" value={assignStudentFields.dateOfBirth} onchange={handleChangeField} label="Date of Birth" required={true} error={assignStudentFields.errors.dateOfBirth} type="date" />
                                </Grid>
                                <Grid item sm={6}>
                                    <InputLabel id="classCode" name="classCode">
                                        <span aria-hidden="true" className="MuiFormLabel-asterisk Mui-error">*</span>
                                        Class</InputLabel>
                                    <Select
                                        labelId="Select Class"
                                        id="demo-simple-select-outlined"
                                        name='classCode'
                                        disabled={_.isEmpty(props.codes)}
                                        value={assignStudentFields.classCode || ''}
                                        onChange={handleChangeField}
                                        keyboardicon={<ArrowDropDownIcon />}
                                        MenuProps={{
                                            anchorOrigin: { vertical: "bottom", horizontal: "left" },
                                            transformOrigin: { vertical: "top", horizontal: "left" },
                                            getContentAnchorEl: null
                                        }}
                                        required={true}
                                        error={assignStudentFields.errors.classCode || null}
                                    >
                                        {props.codes && props.codes.map((item, index) => {
                                            return (
                                                <MenuItem value={item} key={index} >{item}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSubmit}>Save</Button>
                    <Button autoFocus onClick={() => props.handleClose()}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AssignStudent;