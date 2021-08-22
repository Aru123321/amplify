import React from "react";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import MuiAlert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    
}));

const CustomSnackbar = (props) => {
    const classes = useStyles();
    return (
       <div>
            <Snackbar open={props.open} autoHideDuration={1000} onClose={props.handleClose}>
                <Alert onClose={props.handleClose} severity={props.severity}>
                    {props.message}
                </Alert>
            </Snackbar>
       </div> 
    )
}

export default CustomSnackbar;