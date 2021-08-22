import { Button, Grid, Link, Typography } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router';
import {getRequestDetails, volunteerForRequest, closeRequest, reOpenRequest, closeAdminRequest, generateOtp, getLogin} from "../Api/api";
import { useHistory } from "react-router-dom";
import {getToken, setToken} from "../Functions/functions";
import CloseRequestModal from "../Components/CloseRequestModal";
import SelectVolunteer from "../Components/SelectVolunteerToCloseModal";
import DetailInfoPatientModal from "../Components/DetailInfoPatientModal";
import LoginModal from "../Components/LoginModal";
import ShareIcon from '@material-ui/icons/Share';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import VolunteerModal from "../Components/VolunteerContactModal";
import Volunteer from './Volunteer';
import MetaTags from 'react-meta-tags';

const Help = () => {
    var params = useParams();
    const history = useHistory();
    const [helpData, setHelpData] = React.useState({});
    const [isVolunteer, setIsVolunteer] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isMyRequest, setIsMyRequest] = React.useState(false  );
    const [countVolunteers, setCountVolunteers] = React.useState(0);
    const [openCloseRequestModal, setOpenCloseRequestModal] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [openSelectVolunteer, setOpenSelectVolunteer] = React.useState(false);
    const [volunteers, setVolunteers] = React.useState([]);
    const [selectedVolunteerValue, setSelectedVolunteerValue] = React.useState("none");
    const [openSendDetailInfo, setOpenSendDetailInfo] = React.useState(false);
    const [detailText, setDetailText] = React.useState("");
    const [openLogin, setOpenLogin] = React.useState(false);
    const [mobile, setMobile] = React.useState("");
    const [otp, setOtp] = React.useState("");
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [isFavourite, setIsFavourite] = React.useState(false);
    const [openContactModal, setOpenContactModal] = React.useState(false);

    const handleVolunteerClick = () => {
        if(!getToken()){
            setOpenLogin(true);
            // history.push("/login", { from: history.location.pathname })
        }
        else{
            setOpenSendDetailInfo(true)
            // volunteerForRequest(params)
            //     .then(data => {
            //         setIsVolunteer(true)
            //     })
            //     .catch(err => {
            //     })
        }

    }

    const handleCloseYesClick = () => {
        closeRequest(params)
            .then(data => {
                window.location.reload();
            })
            .catch(err => {
            })
    }

    const handleCloseNoClick= () => {
        setOpenCloseRequestModal(false)
    }

    const handleDeleteNoClick = () => {
        setOpenDeleteModal(false)
    }

    const handleDeleteYesClick = () => {

    }

    const handleReopen = () => {
        reOpenRequest(params)
            .then(data => {
                window.location.reload()
            })
            .catch(err => {
            })
    }

    const handleVerifiedClosure = () => {
        closeAdminRequest({
            code: params.code,
            mobile: selectedVolunteerValue
        })
        .then(data => {
            setOpenSelectVolunteer(false);
            window.location.reload()
        })
        .catch(err => {
        })
    }

    const handleVolunteerChange = (event) => {
        setSelectedVolunteerValue(event.target.value)
    }

    const handleClosureByAdmin = () => {

    }

    const detailInfoPatientClickHandler = () => {
        var newParams = params;
        newParams.detailText = detailText;
        newParams.isContacted = true
        volunteerForRequest(params)
                .then(data => {
                    setIsVolunteer(true);
                    setOpenSendDetailInfo(false);
                    setTimeout(() => window.location.reload(), 1000);
                })
                .catch(err => {
                })
    }

    const handleFavourite = (isFavourite) => {
        var newParams = params;
        newParams.isFavourite = isFavourite
        if(getToken()){
            volunteerForRequest(newParams)
                .then(data => {
                    setIsFavourite(isFavourite)                    
                })
                .catch(err => {
                })
        }else{
            setOpenLogin(true)
        }
        
    }

    // const getStatus = (name) => {
    //     switch(name){
    //         case "open":
    //             return "Open"
    //         case "closed":
    //             return "Closed"
    //         case "verified close":
    //             return "Closed By Patient";
    //     }
    // }

    const getStatus = (data) => {
        const date = data.createdAt;
        const date1 = new Date(date);
        const date2 = new Date();
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
        const status = data.status;
        const isContacted = data.volunteers && data.volunteers.length>0;
    
        if(status == "open" && isContacted){
          return "Contacted"
        }else if(status == "open" && !isContacted && diffDays<3){
          return "Open"
        }else if(status == "open" && !isContacted && diffDays>=3){
          return "Unresolved"
        }else if(status == "closed"){
            return "Closed"
        }else if(status == "verified close"){
            return "Closed By Patient";
        }
    
      }

    const handleSendOtp = () => {
        generateOtp(mobile)
            .then(data => {
            })
            .catch(err => {
            })
    }

    const handleVolunteerModalClose = () => {
        setOpenContactModal(false)
    }

    const handleLogin = ()=> {
        getLogin({
            mobile: mobile,
            otp: otp
        })
        .then(data => {
            if(data.success){
                setToken(data.token)
                setOpenLogin(false);
                setOpenSendDetailInfo(true)
                setErrorMessage("");
            }else{
                setErrorMessage(data.result);
            }
            
        })
        .catch(err => {
        })
    }



    const handleOnShareClick = () => {
        console.log(window.navigator)
	if (navigator.share) {
          navigator
            .share({
              title: "test",
              text: `${helpData.patient_name} in ${helpData.locality.city.city} is looking for ${helpData.category.category_name} \n*Help Type*: ${helpData.category.category_name} \n*Name*: ${helpData.patient_name} \n*Age*: ${helpData.age} \n*Covid Status*: ${helpData.covid_test_result}\n*City*: ${helpData.locality.city.city}`,
              url: document.location.href,
            })
            .then(() => {
              console.log('Successfully shared');
            })
            .catch(error => {
              console.error('Something went wrong sharing the blog', error);
            });
        }
      };


    const getGender = (value) => {
        switch(value){
            case "male":
                return "Male";
            case "female":
                return
        }
            
    }
    React.useEffect(() => {
        getRequestDetails(params, localStorage.getItem('token'))
            .then(data => {
                if(data.success){
                    setHelpData(data.data)
                    setIsVolunteer(data.isVolunteer)
                    setIsMyRequest(data.isMyRequest)
                    setCountVolunteers(data.helpingVolunteerCount)
                    setVolunteers(data.data.volunteers)
                    setIsLoading(false)
                    setIsFavourite(data.isFavourite)

                        // document.title = "test";
                }else{
                    // history.push("/")
                }
                
            })
            .catch(err => {
            })
    },[localStorage.getItem('token')])



    return(
        <div style={{padding: 20}}>
            {helpData.patient_name &&
                <MetaTags>
                    <title>{`${helpData.patient_name} in ${helpData.locality.city.city} is looking for ${helpData.category.category_name}`}</title>
                    <meta property="og:title" content={`${helpData.patient_name} in ${helpData.locality.city.city} is looking for ${helpData.category.category_name}`} />
                    <meta property="og:image" content="path/to/image.jpg" />
                </MetaTags>
            }
            <div style={{display: "flex", flex: 1}}>
                <Typography style={{flex: 1/4, fontSize: 14}}>{getStatus(helpData)}</Typography>
                <div style={{flex: 1/2, textAlign: "center"}}>
                    <Typography>{helpData.locality?helpData.locality.city.city: "--"}</Typography>
                    <Typography>{helpData.locality?helpData.locality.locality_name: "--"}</Typography>
                </div>
                <div style={{display: "flex", flex: 0.25, flexDirection: "column", alignItems: "flex-end"}}>
                    <div>
                        <ShareIcon style={{padding: 5}} onClick={handleOnShareClick} />
                        {!isMyRequest &&
                        <>
                        { !isFavourite &&
                            <FavoriteBorderIcon style={{fill: "red"}} onClick={() => handleFavourite(true)} style={{padding: 5, paddingRight: 0}} />
                        }
                        { isFavourite &&
                            <FavoriteIcon onClick={() => handleFavourite(false)} style={{padding: 5, paddingRight: 0, fill: "red"}} />
                        }
                        </>}
                    </div>
                </div>
            </div>
            <div style={{marginTop: 30, textAlign: "center"}}>
                <Typography style={{fontWeight: "bold"}}>Help Needed: {helpData.category && helpData.category.category_name}</Typography>
            </div>
            <div style={{display: "flex", marginTop: 10}}>
                <div style={{flex: 1}}>
                    <Typography style={{fontSize: 14}}>{helpData.patient_name}:  {helpData.age} / {helpData.gender && helpData.gender.charAt(0).toUpperCase() + helpData.gender.slice(1)}</Typography>
                    <Typography style={{fontSize: 14}}>Covid Status:  {helpData.covid_test_result} {helpData.date_of_detetection && (new Date(helpData.date_of_detetection)).toDateString()}</Typography>
                </div>
            </div>
            <div style={{paddingTop :40}}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <div style={{ padding: "15px 0px", textAlign: "center", borderRadius: 10, boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
                            <Typography style={{fontWeight: "bold"}}>SPO2</Typography>
                            <Typography>{helpData.spo2_level?helpData.spo2_level+"%":"--"}</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div style={{ padding: "15px 0px", textAlign: "center",  borderRadius: 10, boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
                            <Typography style={{fontWeight: "bold"}}>CT Value</Typography>
                            <Typography>{helpData.ct_value?helpData.ct_value:"--"}</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div style={{ padding: "15px 0px", textAlign: "center",  borderRadius: 10, boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
                            <Typography style={{fontWeight: "bold"}}>{helpData.admitted == "hospital"?"Admitted At": "Currently At"}</Typography>
                            <Typography>{helpData.admitted?helpData.admitted:"--"}</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div style={{ padding: "15px 0px", textAlign: "center",  borderRadius: 10, boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
                            <Typography style={{fontWeight: "bold"}}>Preference</Typography>
                            <Typography>{helpData.affordability?helpData.affordability:"--"}</Typography>
                        </div>
                    </Grid>
                    {helpData.bu_number &&
                        <Grid item xs={6}>
                        <div style={{ padding: "15px 0px", textAlign: "center",  borderRadius: 10, boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
                            <Typography style={{fontWeight: "bold"}}>BU Number</Typography>
                            <Typography>{helpData.bu_number?helpData.bu_number:"--"}</Typography>
                        </div>
                    </Grid>
                    }
                    {helpData.srf_id &&
                        <Grid item xs={6}>
                            <div style={{ padding: "15px 0px", textAlign: "center",  borderRadius: 10, boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
                                <Typography style={{fontWeight: "bold"}}>SRF Number</Typography>
                                <Typography>{helpData.srf_id?helpData.srf_id:"--"}</Typography>
                            </div>
                        </Grid>
                    }
                </Grid>
            </div>
            <Typography style={{textAlign: "center", marginTop: 20, opacity: "0.5", fontSize: "14px", marginBottom: 5}}>Created on {helpData.createdAt?(new Date(helpData.createdAt)).toDateString(): "--"}</Typography>
            {helpData.status != "verified close" && <Typography style={{textAlign: "center"}}>People Volunteering for this request: {countVolunteers}</Typography>}
            {isMyRequest && countVolunteers>0 && helpData.status != "verified close" &&
                <div style={{textAlign: "center"}}>
                    <Link href="#" onClick={() => setOpenContactModal(true)}> Contact People Volunteering for you</Link>
                </div>
            }
            {!isMyRequest && isVolunteer &&
                <div style={{textAlign: "center"}}>
                    <Typography>Thanks for Volunteering. You are a hero.</Typography>
                </div>
            }
            {!isLoading && !isVolunteer && !isMyRequest && helpData.status != "closed" &&
                <Button fullWidth color="primary" variant="contained" style={{marginTop: 30}} onClick={handleVolunteerClick}>Send Help To Patient</Button>
            }
            {!isLoading && isMyRequest && helpData.status == "closed" &&
                <div style={{textAlign: "center"}}>
                    <Typography>This request has been closed by {helpData.volunteers[0].user.name}</Typography>
                    <Button fullWidth color="primary" variant="contained" style={{marginTop: 30}} onClick={handleReopen}> ReOpen Request </Button>
                    {/* <Button fullWidth color="primary" variant="contained" style={{marginTop: 20, marginBottom: -10}} onClick={() => setOpenSelectVolunteer(true)}> Close Request </Button> */}
                </div>
            }
            {!isLoading && isMyRequest &&  helpData.status != "verified close" &&
                <div>
                    <Button fullWidth color="primary" variant="contained" style={{marginTop: 20, marginBottom: -10}} onClick={() => setOpenSelectVolunteer(true)}> Close Request </Button>
                    {false && <Button fullWidth color="primary" variant="contained" style={{marginTop: 30}} onClick={() => setOpenDeleteModal(true)}> Delete Request </Button>}
                </div>
            }
            {!isLoading && isVolunteer && helpData.status != "closed" && helpData.status != "verified close" &&
                <Button fullWidth color="primary" variant="contained" style={{marginTop: 30}} onClick={() => setOpenCloseRequestModal(true)}> Close Request </Button>
            }
            {!isLoading && isVolunteer && helpData.status == "closed" &&
                <div style={{textAlign: "center"}}>
                    <Typography>This request has been closed by a volunteer</Typography>
                </div>
            }
            <CloseRequestModal type="close" open={openCloseRequestModal} handleNoClick={handleCloseNoClick} handleYesClick={handleCloseYesClick} />
            <CloseRequestModal type="delete" open={openDeleteModal} handleNoClick={handleDeleteNoClick} handleYesClick={handleDeleteYesClick} />
            <SelectVolunteer handleChange={handleVolunteerChange} value={selectedVolunteerValue} open={openSelectVolunteer} volunteers={volunteers} handleSubmit={handleVerifiedClosure} handleClose={() => setOpenSelectVolunteer(false)} />
            <DetailInfoPatientModal open={openSendDetailInfo} onClick={detailInfoPatientClickHandler} onChangeText={(e) => setDetailText(e.target.value)} />
            <LoginModal error={errorMessage} handleMobileChange={(e) => setMobile(e.target.value)} handleOtpChange={(e) => setOtp(e.target.value)} open={openLogin} handleSubmit={handleLogin} handleSendOtp={handleSendOtp} />
            <VolunteerModal open={openContactModal} volunteerData={helpData.volunteers} handleClose={handleVolunteerModalClose} />
        </div>
    )
}

export default Help;
