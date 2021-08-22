import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Grid } from '@material-ui/core';
import TextField from "./Textfield";
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: "80vw",
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
  },
}));

export default function LoginModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div style={{padding: 20}}>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <div>
                    <TextField sendOtp handleOnChange={props.handleMobileChange} type="number" handleClick={props.handleSendOtp} placeholder={"Mobile Number"} />
                </div>
                <div style={{marginTop: "30px"}}>
                    <TextField error={props.error?true:false} helperText={props.error} handleOnChange={props.handleOtpChange} placeholder={"Otp"} />
                </div>
            </Grid>
            <Grid item xs={12}>
                <Button fullWidth color="primary" variant="contained" onClick={props.handleSubmit} >Login</Button>
            </Grid>
        </Grid>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}