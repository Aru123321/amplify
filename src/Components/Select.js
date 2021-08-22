import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "100%"
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    labelProps: {
        "&.MuiInputLabel-outlined": {
            transform: "translate(14px, 24px) scale(1)",
            fontSize: "14px"
        },
        "&.MuiInputLabel-outlined.MuiInputLabel-shrink": {
            transform: "translate(14px, 10px) scale(0.75)"
        },
        
    }
  }));

const CustomSelectbox = (props) => {
    const classes = useStyles();

    return(
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="outlined-age-native-simple">{props.placeholder}</InputLabel>
            <Select
                native
                fullWidth
                label={props.placeholder}
                displayEmpty={true}
                value={props.value}
                onChange={props.handleOnChange}
                inputProps={{
                    name: 'age',
                    id: 'outlined-age-native-simple',
                }}
            >
                <option aria-label="None" value="" />
                {props.data.map((category, index) => 
                    <option key={index} value={category[props.valueIdentifier]}>{category[props.valueIdentifier]}</option>
                )}
            </Select>
        </FormControl>
    )
}

export default CustomSelectbox;