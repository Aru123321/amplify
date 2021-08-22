import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Grid, Typography } from '@material-ui/core';
import TextField from "./Textfield";
import PhoneIcon from '@material-ui/icons/Phone';
import ChatIcon from '@material-ui/icons/Chat';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';

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
    padding: "20px"
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

export default function VolunteerModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [showMessage, setShowMessage] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const body = (
    <div style={modalStyle} className={classes.paper}>
        <div style={{display: "flex", textAlign: "right", margin: -10, marginBottom: 10}}>
                {showMessage &&
                    <div>
                        <ArrowBackIcon onClick={() => setShowMessage(false)} />
                    </div>
                }
                <div style={{flex:1}}>
                        <CloseIcon onClick={props.handleClose} />
                </div>
            
        </div>
      {props.volunteerData && !showMessage && props.volunteerData.map((volun, index) => 
        <div key={index}>
            {volun.user.name} 
            <span style={{float: "right"}}>
                {volun.detail_text && <ChatIcon onClick={() => {setShowMessage(true); setMessage(volun.detail_text)}} style={{marginRight: 10}} />} 
                <PhoneIcon />
            </span>
        </div>
      )}
      {!props.volunteerData || props.volunteerData.index ==0 && !showMessage &&
        <div>
            <Typography>No Voluenteers for your request</Typography>
        </div>
      }
      {showMessage && 
            <div>
                <div style={{marginTop: 10, padding: 10}}>
                    {message}
                </div>
            </div>
      }
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