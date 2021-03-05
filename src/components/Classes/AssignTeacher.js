import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import TeacherService from '../../services/TeacherService';

function AssignTeacher(props) {
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        debugger;
        getTeachers();
    }, []);

    const getTeachers = async () => {
        await TeacherService.getTeachers()
            .then(res => {
                let teachers = [];
                let keys = Object.keys(res.data);
                keys.map((key) => {
                    if (res.data[key].ClassCode === "") {
                        teachers.push(res.data[key]);
                    }
                });
                setTeachers(teachers);
            })
            .catch();
    }

    return (
        <Dialog
            onClose={props.handleClose}
            open={props.open}
            aria-labelledby="customized-dialog-title">
            <DialogTitle
                id="customized-dialog-title"
                onClose={props.handleClose}>
                Assign Teacher
            </DialogTitle>
            <DialogContent>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!_.isEmpty(teachers)
                                ?
                                teachers.map((row, index) => {
                                    console.log("row - ", row);
                                    <TableRow key={index}>
                                        <TableCell scope="row" padding="none">{row.FullName}</TableCell>
                                        <TableCell scope="row" align="left">{row.Email}</TableCell>
                                        <TableCell scope="row" align="left"></TableCell>
                                    </TableRow>
                                })
                                : (
                                    <TableRow>
                                        <TableCell>No Data</TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AssignTeacher;