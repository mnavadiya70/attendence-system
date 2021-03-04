import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    AppBar,
    Tab,
    Tabs,
    Box
} from "@material-ui/core";
import _ from 'lodash';
import TeachersTab from './TeachersTab';
import StudentsTab from './StudentsTab';
import AttendanceTab from './AttendanceTab';

function CommonDialog(props) {
    const [value, setValue] = useState(0);

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box p={3}>
                        <div className="box-wrapper">{children}</div>
                    </Box>
                )}
            </div>
        );
    }

    function a11yProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Dialog onClose={() => props.handleClose()} aria-labelledby="customized-dialog-title"
            open={props.open}>
            <DialogTitle id="customized-dialog-title" onClose={() => props.handleClose()}>
                {props.classCode}
            </DialogTitle>
            <DialogContent>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Teachers" {...a11yProps(0)} />
                        <Tab label="Students" {...a11yProps(1)} />
                        <Tab label="Mark Attendance" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <TeachersTab classCode={props.classCode} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <StudentsTab classCode={props.classCode} />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <AttendanceTab classCode={props.classCode} />
                </TabPanel>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={() => props.handleClose()}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CommonDialog;