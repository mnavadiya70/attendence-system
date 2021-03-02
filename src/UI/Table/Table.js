import React from 'react';
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
import _ from 'lodash';

function CustomTable(props){
    return (
<Paper>
                <TableContainer>
                    <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        { !_.isEmpty(props.headers) && props.headers.map((header, index) => (
                                            <TableCell padding={index === 0 ? "none" : "left"}>{header}</TableCell>
                                        ))
                                    }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        !_.isEmpty(props.data) && props.data.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell scope="row" align="left" padding="none">{row.fname}</TableCell>
                                                <TableCell scope="row" align="left">{row.lname}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                </TableContainer>
                {/* {!_.isNull(totalCount) && totalCount > 1 && (
                    <Pagination shape="rounded" page={currentPage} count={totalCount} onChange={handlePageChange}/>
                )} */}
            </Paper>
    );
}

export default CustomTable;