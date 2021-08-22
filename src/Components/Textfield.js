import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Typography, Button } from '@material-ui/core';


const useStyles = makeStyles({
    labelProps: {
        "&.MuiInputLabel-outlined": {
            transform: "translate(14px, 24px) scale(1)",
            fontSize: "14px"
        },
        "&.MuiInputLabel-outlined.MuiInputLabel-shrink": {
            transform: "translate(14px, 10px) scale(0.75)"
        },
        
    }
  });

const CustomTextfield = (props) => {
    const classes = useStyles();
    return(
        <TextField
            required={props.required}
            fullWidth
            error={props.error}
            id="outlined-required"
            label={props.placeholder}
            variant="outlined"
            helperText={props.error?props.helperText:false}
            onChange={props.handleOnChange}
            type={props.type && props.type}
            inputProps={{
                style: {
                    padding: "14px",
                    paddingTop: "28px"
                },
            }}
            InputLabelProps={{
                className: classes.labelProps,
                shrink: props.shrink
            }}
            InputProps={{
                endAdornment: props.sendOtp && <Button onClick={props.handleClick} style={{fontSize: 12, whiteSpace: "nowrap"}}>Send Otp </Button>
            }}
        />
    )
}

export default CustomTextfield;