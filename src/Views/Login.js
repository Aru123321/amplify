import { Button, Container, Divider, Typography } from '@material-ui/core';
import React from 'react';
import TextField from  "../Components/Textfield";
import {generateOtp, getLogin, updateName} from "../Api/api";
import { useHistory } from "react-router-dom";
import AskForUserName from "./AskForUserName";
import Snackbar from "../Components/Snackbar";


const Login = ({setToken}) => {
    const [mobile, setMobile] = React.useState("");
    const [otp, setOtp] = React.useState("");
    const [showAskName, setShowAskName] = React.useState()
    const [name, setName] = React.useState("");
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [severity, setSeverity] = React.useState("");

    let history = useHistory();
    const handleSendOtp = () => {
        if(mobile.length == 10){
            generateOtp(mobile)
                .then(data => {
                    if(data.success){
                        setSeverity("success");
                        setMessage("Otp has been send successfully")
                        setOpenSnackbar(true)
                    }else{
                        setSeverity("error");
                        setMessage("Unable to send Otp")
                    }
                })
                .catch(err => {
                })
        }else{
            setSeverity("error");
            setMessage("Please Enter a valid mobile")
            setOpenSnackbar(true)
        }
        
    }

    const handleLogin = ()=> {
        getLogin({
            mobile: mobile,
            otp: otp
        })
        .then(data => {
            if(data.success){
                setToken(data.token)
                if(data.user.name =="" || data.user.name == null || !data.user.name){
                    setShowAskName(true)
                }
                else{
                    history.push("/")
                }
            }else{
                if(data.result){
                    setMessage(data.result)
                    setSeverity("error")
                    setOpenSnackbar(true)
                }
            }
            
        })
        .catch(err => {
            console.log(err)
        })
    }

    const checkHistory = () => {
        // history.goBack();
    }

    const handleOnSubmit= () => {
        updateName({
            name: name
        })
        .then(data => {
            history.push("/")
        })
        .catch(err => {
        })
    }

    const handleSnackbarClose = () => {
        setOpenSnackbar(false)
    }


    return(
        <div>
            {!showAskName && <div style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "80%"}}>
                <div style={{position: "absolute", top: "-100px", textAlign: "center", width: "100%"}}>
                    <Typography style={{fontSize: "24px"}}>Login</Typography>
                </div>
                <div>
                    <TextField sendOtp handleOnChange={(e) => setMobile(e.target.value)} type="number" handleClick={handleSendOtp} placeholder={"Mobile Number"} />
                </div>
                <div style={{marginTop: "30px"}}>
                    <TextField handleOnChange={(e) => setOtp(e.target.value)} placeholder={"Otp"} />
                </div>
                <div style={{marginTop: "30px"}}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                </div>
            </div>}
            {showAskName && 
                <AskForUserName name={name} onChange={(e) => setName(e.target.value)} onSubmit={handleOnSubmit} />
            }
            <Snackbar open={openSnackbar} severity={severity} message={message} handleClose={handleSnackbarClose} />
        </div>
    )
}

export default Login;