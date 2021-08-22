import { Button, Typography } from '@material-ui/core';
import React from 'react';
import TextField from "../Components/Textfield";

const AskForUserName = (props) => {

    return(
        <div style={{display: "flex", height: "100vh", justifyContent: "center", alignItems: "center"}}>
            <div>
                <Typography> Please enter your name to proceed</Typography>
                <div style={{marginTop: 40}}>
                    <TextField placeholder={"Full Name"}  handleOnChange={props.onChange}/>
                </div>
                <Button disabled={props.name?false:true} style={{marginTop: 40, borderRadius: 10}} size="large" fullWidth color="primary" variant="outlined" onClick={props.onSubmit}> Submit</Button>
            </div>
        </div>
    )
}

export default AskForUserName;