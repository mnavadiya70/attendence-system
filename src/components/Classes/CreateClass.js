import React, { Component } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    Button,
    TableHead
} from "@material-ui/core";
import _ from 'lodash';

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

    return (
        <div>
            <Dialog onClose={() => props.handleClose(false)} aria-labelledby="customized-dialog-title"
                open={props.open}>
                <DialogTitle id="customized-dialog-title" onClose={() => props.handleClose(false)}>
                    approvalFlow
                </DialogTitle>
                <DialogContent style={{ maxWidth: "650px" }}>
                    <div>
                        <TableContainer component={Paper}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="none">dateAndTime</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell scope="row" align="left">row.content.substring(row.content.lastIndexOf(":") + 1)}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => props.handleClose(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CreateClass;