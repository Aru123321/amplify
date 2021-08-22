import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Grid } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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
    maxHeight: "80vh",
    overflow: "scroll",
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
  },
}));

export default function SelectVolunteer(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <div>
        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div style={modalStyle} className={classes.paper}>
                <div style={{padding: 20}}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Volunteers</FormLabel>
                        <RadioGroup aria-label="gender" name="gender1" value={props.value} onChange={props.handleChange}>
                            <FormControlLabel value={"none"} control={<Radio />} label={"None"} />
                            {props.volunteers.map((volunteer, index) => 
                                <FormControlLabel key={index} value={volunteer.user.mobile} control={<Radio />} label={volunteer.user.name + " " + volunteer.user.mobile} />
                            )}
                        </RadioGroup>
                    </FormControl>
                    <Grid container spacing={3} style={{marginTop: 20}}>
                        <Grid item xs={6}>
                            <Button fullWidth color="primary" variant="outlined" onClick={props.handleClose}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button fullWidth color="primary" variant="contained" onClick={props.handleSubmit}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Modal>
    </div>
  );
}