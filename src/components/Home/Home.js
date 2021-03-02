import React, { Component } from 'react';
import {
    Link,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    Checkbox,
    TableHead
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import _ from 'lodash';
import Loader from '../../loader/Loader';
import CustomTable from '../../UI/Table/Table';

const home = () => {
    function createData(fname, lname) {
        return { fname, lname };
      }
      const rows = [
        createData('Dwayne1', 'Johnson'),
        createData('Dwayne', 'Johnson'),
      ];
      const headers = ["fname", "lname"];

        return(
            <CustomTable headers={headers} data={rows}/>
        );
}

export default home;