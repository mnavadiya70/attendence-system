import React from "react";
import {
    Box,
    TextField,
} from "@material-ui/core";

function ModalTextField(props) {
    const { label, value, required, onchange, error, name, disabled, helperText } = props;
    return (
        <Box>
            <Box component="label" style={{textDecorationColor: "gray"}}>
            {required && (<Box component="span" aria-hidden="true">*</Box>)}
            {label}</Box>
            <TextField
                name={name}
                label=""
                error={error}
                value={value || ''}
                disabled={disabled}
                onChange={(event) => onchange(event)}
                helpertext={helperText}
            />
        </Box>
    );
}

export default ModalTextField;
