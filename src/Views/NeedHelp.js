import React from 'react';
import Header from "../Components/Header";
import { makeStyles } from '@material-ui/core/styles';
import TextField from  "../Components/Textfield";
import Select from "../Components/Select";
import { Button, Divider, Grid, FormControl, FormHelperText } from '@material-ui/core';
import Autocomplete from "../Components/AutoComplete";
import DatePicker from "../Components/DatePicker";
import {getAllCities, getLocalities, getCategories, submitHelp, generateOtp, getBloodGroups} from "../Api/api";
import RedirectModal from "../Components/RedirectModal";
import Snackbar from "../Components/Snackbar";

const gender = [{
    name: "Male",
    value: "male"
}, {
    name: "Female",
    value: "female"
}, {
    name: "Other",
    value: "other"
}]

const resultType = [{
    name: "Positive"
},{
    name: "Negative"
},{
    name: "Suspected"
},{
    name: "Awaiting Result"
}]

const currentlyAtOption = [{
    name: "Home"
}, {
    name: "Hospital"
},{
    name: "Isolated elsewhere"
}]

const styles = {
    'input-label': {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      width: '100%',
      color: 'red'
    },
  
    'input': {
      '&::placeholder': {
        textOverflow: 'ellipsis !important',
        color: 'blue'
      }
    }
};

const useStyles = makeStyles({
    labelProps: {
        "&.MuiInputLabel-outlined": {
            transform: "translate(14px, 17px) scale(1)"
        },
        "&.MuiInputLabel-outlined.MuiInputLabel-shrink": {
            transform: "translate(14px, -4px) scale(0.75)"
        }
    }
  });



const NeedHelp = (props) => {
    const classes = useStyles();
    const [mobile, setMobile] = React.useState("");
    const [otp, setOtp] = React.useState("");
    const [name, setName] = React.useState("");
    const [helpType, setHelpType] = React.useState("");
    const [dateOfDetection, setDateOfDetection] = React.useState("");
    const [cities, setCities] = React.useState([]);
    const [selectedCity, setSelectedCity] = React.useState("");
    const [localities, setLocalities] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [age, setAge] = React.useState("");
    const [spo2Level, setSpo2level] = React.useState("");
    const [ctValue, setCtValue] = React.useState("");
    const [bloodGroup, setBloodGroup] = React.useState("");
    const [selectedLocality, setSelectedLocality] = React.useState("");
    const [covidTestResult, setCovidTestResult] = React.useState("");
    const [srfId, setSrfId] = React.useState("");
    const [bloodGroups, setBloodGroups] = React.useState([]);
    const [selectedGender, setSelectedGender] = React.useState("");
    const [seconds, setSeconds] = React.useState(3);
    const [buNumber, setBuNumber] = React.useState("");
    const [currentlyAt, setCurrentlyAt] = React.useState("");
    const [hospitalName, setHospitalName] = React.useState("");

    const [otpError, setOtpError] = React.useState(false);
    const [otpErrorTwo, setOtpErrorTwo] = React.useState(false);
    const [fullNameError, setFullNameError] = React.useState(false)
    const [helpError, setHelpError] = React.useState(false)
    const [mobileError, setMobileError] = React.useState(false);
    const [covidResultError, setCovidResultError] = React.useState(false);
    const [dateOfDetectionError, setDateOfDetectionError] = React.useState(false);
    const [srfIdError, setSrfIdError] = React.useState(false);
    const [cityError, setCityError] = React.useState(false);
    const [localityError, setLocalityError] = React.useState(false);
    const [ageError, setAgeError] = React.useState(false);
    const [oxygenError, setOxygenError] = React.useState(false);
    const [bgError, setBgError] = React.useState(false);
    const [genderError, setGenderError] = React.useState(false);
    const [openRedirectModal, setOpenRedirectModal] = React.useState(false);
    const [hospitalNameError, setHospitalNameError] = React.useState(false);

    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [severity, setSeverity] = React.useState("");


    const handleSnackbarClose = () => {
        setOpenSnackbar(false)
    }

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

    const handleSubmit = () => {
        if(validate()){
            var params = {
                mobile: mobile,
                name: name,
                helpType: helpType,
                covidTestResult: covidTestResult,
                dateOfDetection: dateOfDetection,
                srfId: srfId,
                city: selectedCity,
                locality: selectedLocality,
                age: age,
                spo2Level: spo2Level,
                ctValue: ctValue,
                bloodGroup: bloodGroup,
                otp: otp,
                gender: selectedGender,
                buNumber: buNumber,
                admitted: currentlyAt
            }
            submitHelp(params)  
                .then(data => {
                    if(data.result && data.result == "Invalid Otp"){
                        setOtpError(true);
                        window.scrollTo({top: 0, left: 0, behavior: 'smooth' });
                    }else{
                        setOpenRedirectModal(true);
                        setTimeout(function(){ window.location.href="/" }, 3000);

                    }
                })
                .catch(err => {
                })
        }else{
            window.scrollTo({top: 0, behavior: "smooth"})
        }
        
    }

    const validate = () => {
        var res = true
        if(!name){
            setFullNameError(true)
            res = false
        }else{
            setFullNameError(false)
        }

        if(!helpType){
            setHelpError(true)
            res = false
        }
        else{
            setHelpError(false)
        }

        if(!mobile){
            res = false
            setMobileError(true)
        }else{
            setMobileError(false)
        }

        if(!covidTestResult){
            res = false
            setCovidResultError(true)
        }else{
            setCovidResultError(false)
        }
        
        // if(!dateOfDetection){
        //     res = false
        //     setDateOfDetectionError(true)
        // }else{
        //     setDateOfDetectionError(false)
        // }

        // if(!srfId){
        //     res = false
        //     setSrfIdError(true)
        // }else{
        //     setSrfIdError(false)
        // }

        if(!selectedCity){
            res = false
            setCityError(true)
        }
        else{
            setCityError(false)
        }

        if(!selectedLocality){
            res = false
            setLocalityError(true)
        }
        else{
            setLocalityError(false)
        }

        if(!age){
            res = false
            setAgeError(true)
        }
        else{
            setAgeError(false)
        }

        // if(!spo2Level){
        //     res = false
        //     setOxygenError(true)
        // }
        // else{
        //     setOxygenError(false)
        // }

        if(helpType == "Plasma" && !bloodGroup){
            res = false
            setBgError(true)
        }
        else{
            setBgError(false)
        }

        if(!mobile){
            res = false
            setMobileError(true)
        }else{
            setMobileError(false)
        }

        if(!otp){
            res = false
            setOtpErrorTwo(true)
        }
        else{
            setOtpErrorTwo(false)
        }

        if(!selectedGender){
            res = false
            setGenderError(true)
        }
        else{
            setGenderError(false)
        }

        if(currentlyAt == "Hospital" && !hospitalName){
            res = false;
            setHospitalNameError(true)
        }else{
            setHospitalNameError(false)
        }

        return res
    }

    React.useEffect(() => {
        getAllCities()
            .then(data => {
                setCities(data.data)
            })
            .catch(err => {
            })

        getCategories()
            .then(data => {
                setCategories(data.data)
            })
            .catch(err => {
            })
        
        getBloodGroups()
            .then(data => {
                setBloodGroups(data.data)
            })
            .catch(err => {
            })
    },[])


    React.useEffect(() => {
        if(selectedCity){
            getLocalities(selectedCity)
                .then(data => {
                    setLocalities(data.data)
                })
                .catch(err => {
                })
        }
    }, [selectedCity])

    return(
        <div>
            <Header value="Get Help" />
            <div style={{padding: "40px 20px"}}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <FormControl className={classes.formControl} fullWidth error={mobileError}>
                        <TextField sendOtp handleOnChange={(e) => setMobile(e.target.value)} type="number" handleClick={handleSendOtp} placeholder={"Mobile Number"} />
                        {mobileError && <FormHelperText>This field is required</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl} fullWidth error={otpErrorTwo}>
                            <TextField required error={otpError} helperText={"Invalid Otp"} handleOnChange={(e) => setOtp(e.target.value)} placeholder={"OTP"} />
                            {otpErrorTwo && <FormHelperText>This field is required</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl} fullWidth error={helpError}>
                            <Select handleOnChange={(e) => setHelpType(e.target.value)} data={categories} valueIdentifier="category_name" placeholder={"Help Type"} />
                            {helpError && <FormHelperText>This field is required</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl} fullWidth error={fullNameError}>
                            <TextField required handleOnChange={(e) => setName(e.target.value)} placeholder={"Patient Full Name"} />
                            {fullNameError && <FormHelperText>This field is required</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                    <FormControl className={classes.formControl} fullWidth error={ageError}>
                        <TextField required handleOnChange={(e) => {if(Math.max(0, parseInt(e.target.value) ) < 120 ||  !e.target.value) { e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,3); setAge(e.target.value)}else{e.target.value = age}}} type="number" placeholder={"Patient's Age"} />
                        {ageError && <FormHelperText>This field is required</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                    <FormControl className={classes.formControl} fullWidth error={genderError}>
                        <Select handleOnChange={(e) => setSelectedGender(e.target.value)} data={gender} valueIdentifier="name" placeholder={"Select Gender *"} />
                        {genderError && <FormHelperText>This field is required</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl} fullWidth error={cityError}>
                            <Autocomplete required onChange={(e, value) => setSelectedCity(value)} identifier={"city"} data={cities} placeholder={"City where help is needed"} />
                            {cityError && <FormHelperText>This field is required</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl} fullWidth error={localityError}>
                            <Autocomplete freeSolo required onChange={(e, value) => setSelectedLocality(value)} onInputChange={(e, value) => setSelectedLocality(value)} identifier={"locality_name"} data={localities} placeholder={"Locality"} />
                            {localityError && <FormHelperText>This field is required</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl} fullWidth error={bgError}>
                            <Select handleOnChange={(e) => setBloodGroup(e.target.value)} data={bloodGroups} valueIdentifier="type" placeholder={"Blood Group"} />
                            {bgError && <FormHelperText>This field is required</FormHelperText>}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl} fullWidth error={bgError}>
                            <Select handleOnChange={(e) => setCurrentlyAt(e.target.value)} data={currentlyAtOption} valueIdentifier="name" placeholder={"Currently At"} />
                            {bgError && <FormHelperText>This field is required</FormHelperText>}
                        </FormControl>
                    </Grid>
                    {currentlyAt == "Hospital" && 
                        <Grid item xs={12}>
                            <FormControl className={classes.formControl} fullWidth error={hospitalNameError}>
                                <TextField handleOnChange={(e) => setHospitalName(e.target.value)} placeholder={"Hospital Name"} />
                                {hospitalNameError && <FormHelperText>This field is required</FormHelperText>}
                            </FormControl>
                        </Grid>
                    }
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl} fullWidth error={covidResultError}>
                            <Select handleOnChange={(e) => setCovidTestResult(e.target.value)} data={resultType} valueIdentifier="name" placeholder={"Covid Test Result *"} />
                            {covidResultError && <FormHelperText>This field is required</FormHelperText>}
                        </FormControl>
                    </Grid>
                    {covidTestResult.toLowerCase() =="positive" && 
                        <Grid item xs={12}>
                            <FormControl className={classes.formControl} fullWidth error={dateOfDetectionError}>
                                <TextField required shrink handleOnChange={(e) => setDateOfDetection(e.target.value)} type="date" placeholder={"Date of Detection"} />
                                {dateOfDetectionError && <FormHelperText>This field is required</FormHelperText>}
                            </FormControl>
                        </Grid>
                    }
                    {selectedCity && selectedCity.toLowerCase().includes("bangalore") &&
                        <>
                            <Grid item xs={12}>
                                <FormControl className={classes.formControl} fullWidth>
                                    <TextField handleOnChange={(e) => setSrfId(e.target.value)} placeholder={"SRF ID"} />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl className={classes.formControl} fullWidth>
                                    <TextField handleOnChange={(e) => setBuNumber(e.target.value)} placeholder={"BU Number"} />
                                </FormControl>
                            </Grid>
                        </>
                    }
                    <Grid item xs={12}>
                    <FormControl className={classes.formControl} fullWidth>
                        <TextField type="number" handleOnChange={(e) => {if(Math.max(1, parseInt(e.target.value) ) <= 100 ||  !e.target.value) { e.target.value = Math.max(1, parseInt(e.target.value) ).toString().slice(0,3); setSpo2level(e.target.value)}else{e.target.value = spo2Level}}} placeholder={"SPO2(Oxygen Saturation)"} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField type="number" handleOnChange={(e) => {if(Math.max(1, parseInt(e.target.value) ) <= 100 ||  !e.target.value) { e.target.value = Math.max(1, parseInt(e.target.value) ).toString().slice(0,3); setCtValue(e.target.value)}else{e.target.value = ctValue}}} placeholder={"HRCT Value"} />
                    </Grid>
                    <Grid item xs={12}>
                    <Button fullWidth size="large" variant="contained" color="primary" href="#contained-buttons" onClick={handleSubmit}>
                        Get Help
                    </Button>
                    </Grid>
                </Grid>
            </div>
            <RedirectModal open={openRedirectModal} />
            <Snackbar open={openSnackbar} severity={severity} message={message} handleClose={handleSnackbarClose} />
        </div>
    )
}

export default NeedHelp;