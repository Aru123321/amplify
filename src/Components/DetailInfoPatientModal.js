import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Typography, TextField } from '@material-ui/core';


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
  textarea: {
    resize: "both",
  }
}));

export default function DetailInfoPatientModal(props) {
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
        <Typography style={{fontSize: "12px", fontWeight: "bold"}}>Add Detail info for the patient(optional)</Typography>
            <TextField
                id="outlined-textarea"
                multiline
                variant="outlined"
                rows={5}
                onChange={props.onChangeText}
                fullWidth
                style={{marginTop: "10px"}}
                inputProps={{ className: classes.textarea }}
            />
            <Button variant="contained" color="primary" fullWidth style={{marginTop: "10px"}} onClick={props.onClick}> Proceed </Button>
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