import React, { useState } from 'react';
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
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
// import Pagination from "@material-ui/lab/Pagination";
// import _ from 'lodash';
// import Loader from '../../loader/Loader';
import CustomTable from '../../UI/Table/Table';
import CreateClass from '../../components/Classes/CreateClass'

const Classes = () => {
    const [open, setOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    function createData(std, cls, noOfTeacher, noOfStudent) {
        return { std, cls, noOfTeacher, noOfStudent };
    }

    const rows = [
        createData('Dwayne1', 'Johnson', 1, 10),
        createData('Dwayne', 'Johnson', 2, 20),
    ];
    const headers = ["Standard", "Class", "No of Teachers", "No of Students"];

    const handleTooltipOpen = (value) => {
        setOpen(value);
    };

    const handleOpenDialog = (value) => {
        setOpenDialog(value);
    }

    return (
        <>
            <Tooltip
                title="Create class"
                onClose={() => handleTooltipOpen(false)}
                onOpen={() => handleTooltipOpen(true)}
                open={open}
            >
                <Button
                    name="createClass"
                    startIcon={<AddCircleOutlineIcon />}
                    className={`outlined-btn`}
                    variant="outlined"
                    onClick={() => handleOpenDialog(true)}
                />
            </Tooltip>
            <CustomTable headers={headers} data={rows} />
            <CreateClass open={openDialog} handleClose={handleOpenDialog}/>
        </>
    );
}

export default Classes;