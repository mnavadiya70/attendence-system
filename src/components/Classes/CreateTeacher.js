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
import Alert from "@material-ui/lab/Alert";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import TextField from '../../UI/TextField/TextField';
import TeacherService from '../../services/TeacherService'

function CreateTeacher(props) {
    const fields = {
        firstName: "",
        lastName: "",
        uniqueCode: "",
        email: "",
        errors: {
            firstName: null,
            lastName: null,
            email: null
        }
    }
    const [assignTeacherFields, setAssignTeacherFields] = useState(fields);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChangeField = (event) => {
        const { name, value } = event.target;

        let updFields = { ...assignTeacherFields, [name]: value };

        if (name in updFields.errors) {
            updFields = {
                ...updFields,
                errors: {
                    ...updFields.errors,
                    [name]: !value || value === "" ? true : false,
                }
            }
        }
        setAssignTeacherFields(updFields);
    }

    const handleSubmit = (e) => {
        let error = false;
        let updFields = { ...assignTeacherFields };
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
            FirstName: assignTeacherFields.firstName,
            LastName: assignTeacherFields.lastName,
            FullName: assignTeacherFields.firstName + " " + assignTeacherFields.lastName,
            ClassCode: assignTeacherFields.uniqueCode,
            Email: assignTeacherFields.email
        }

        TeacherService.createTeacher(postData)
            .then((res) => {
                setAssignTeacherFields(fields);
                props.handleClose();
            })
            .catch((error) => {
                setErrorMessage(error);
                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
            });
    }

    return (
        <div>
            <Dialog onClose={() => props.handleClose(false)} aria-labelledby="customized-dialog-title"
                open={props.open}>
                <DialogTitle id="customized-dialog-title" onClose={() => props.handleClose(false)}>
                    Create Teacher
                </DialogTitle>
                <DialogContent style={{ maxWidth: "650px" }}>
                    {!_.isEmpty(errorMessage) && (
                        <p><Alert severity="error">{errorMessage}</Alert></p>
                    )}
                    <Grid container>
                        <Grid item sm={12}>
                            <Grid container spacing={6}>
                                <Grid item sm={6}>
                                    <TextField name="firstName" value={assignTeacherFields.firstName} onchange={handleChangeField} label="First Name" required={true} error={assignTeacherFields.errors.firstName} type="text" />
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField name="lastName" value={assignTeacherFields.lastName} onchange={handleChangeField} label="Last Name" required={true} error={assignTeacherFields.errors.lastName} type="text" />
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField name="email" value={assignTeacherFields.email} onchange={handleChangeField} label="Email" required={true} error={assignTeacherFields.errors.email} type="email" />
                                </Grid>
                                <Grid item sm={6}>
                                    <InputLabel id="uniqueCode" name="uniqueCode">Class Code</InputLabel>
                                    <Select
                                        labelId="Select Class Code"
                                        id="demo-simple-select-outlined"
                                        name='uniqueCode'
                                        disabled={_.isEmpty(props.codes)}
                                        value={assignTeacherFields.uniqueCode || ''}
                                        onChange={handleChangeField}
                                        keyboardicon={<ArrowDropDownIcon />}
                                        MenuProps={{
                                            anchorOrigin: { vertical: "bottom", horizontal: "left" },
                                            transformOrigin: { vertical: "top", horizontal: "left" },
                                            getContentAnchorEl: null
                                        }}
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
                    <Button autoFocus onClick={() => {
                        setAssignTeacherFields(fields);
                        props.handleClose(false);
                    }
                    }>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CreateTeacher;