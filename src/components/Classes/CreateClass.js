import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid, Button
} from "@material-ui/core";
import _ from 'lodash';
import Alert from "@material-ui/lab/Alert";
import TextField from '../../UI/TextField/TextField';
import ClassService from '../../services/ClassService'

function CreateClass(props) {
    const fields = {
        standard: null,
        division: "",
        uniqueCode: "",
        errors: {
            standard: null,
            division: null,
            uniqueCode: null
        }
    }
    const [classFields, setClassFields] = useState(fields);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChangeField = (event) => {
        const { name, value } = event.target;

        let updClassFields = { ...classFields, [name]: value };

        if (name in updClassFields.errors) {
            updClassFields = {
                ...updClassFields,
                errors: {
                    ...updClassFields.errors,
                    [name]: !value || value === "" ? true : false,
                }
            }
        }
        // if(name === "uniqueCode" && !_.isEmpty(props.codes)){
        //     let abc = props.codes.filter(code => code.includes(value));
        //     if(!_.isEmpty(abc)){
        //         updClassFields = {
        //             ...updClassFields,
        //             errors: {
        //                 ...updClassFields.errors,
        //                 [name]: "UniqueCode already exists.",
        //             }
        //         }
        //     }
        // }
        setClassFields(updClassFields);
    }

    const saveClass = (e) => {
        let error = false;
        let updClassFields = { ...classFields };
        // validate data
        for (const [key, value] of Object.entries(updClassFields.errors)) {
            if (updClassFields[key] === "" || !updClassFields[key]) {
                error = true;
                updClassFields.errors[key] = true;
            }
        }

        if (error) {
            setErrorMessage("Please fill all required fields");
            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
            return false;
        }
        else {
            if (props.data) {
                if (props.data.some(x =>
                    (x.standard === classFields.standard &&
                        x.division === classFields.division &&
                        x.uniqueCode === classFields.uniqueCode))) {
                    setErrorMessage("This combination already exists for this class");
                    return;
                }
                else if (props.data.some(x =>
                    ((x.standard === classFields.standard ||
                        x.division === classFields.division) &&
                        x.uniqueCode === classFields.uniqueCode))) {
                    setErrorMessage("This combination already exists for this class");
                    return;
                }
                else if (props.data.some(x =>
                    (x.standard === classFields.standard &&
                        x.division === classFields.division &&
                        x.uniqueCode !== classFields.uniqueCode))) {
                    setErrorMessage("This combination already exists for this class");
                    return;
                }
                else if (props.data.some(x =>
                    (x.standard !== classFields.standard &&
                        x.division !== classFields.division &&
                        x.uniqueCode === classFields.uniqueCode))) {
                    setErrorMessage("This unique code already exists");
                    return;
                }

                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
            }
        }

        const postData = {
            Standard: classFields.standard,
            Division: classFields.division,
            UniqueCode: classFields.uniqueCode
        }


        ClassService.createClass(postData)
            .then((res) => {
                setClassFields(fields);
                props.handleClose(false);
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
                    Create Class
                </DialogTitle>
                <DialogContent style={{ maxWidth: "650px" }}>
                    {!_.isEmpty(errorMessage) && (
                        <p><Alert severity="error">{errorMessage}</Alert></p>
                    )}
                    <Grid container>
                        <Grid item sm={12}>
                            <Grid container spacing={6}>
                                <Grid item sm={6}>
                                    <TextField name="standard" value={classFields.standard} onchange={handleChangeField} label="Standard" required={true} error={classFields.errors.standard} />
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField name="division" value={classFields.division} onchange={handleChangeField} label="Division" required={true} error={classFields.errors.division} />
                                </Grid>
                                <Grid item sm={6}>
                                    <TextField name="uniqueCode" value={classFields.uniqueCode} onchange={handleChangeField} label="Unique Code" required={true} error={classFields.errors.uniqueCode} helperText={classFields.errors.uniqueCode} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={saveClass}>Save</Button>
                    <Button autoFocus onClick={() => props.handleClose(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CreateClass;