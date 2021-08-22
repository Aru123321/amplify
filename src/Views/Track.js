import { Typography, Grid } from '@material-ui/core';
import React from 'react';
import {getMyRequests} from "../Api/api";
import { useHistory } from "react-router-dom";

const Track = () => {
    const history = useHistory();
    const [requestsData, setRequestsData] = React.useState([]);

    const handleClick = (request) => {
        history.push("/help/"+request.code)
    }

    const getStatus = (name) => {
        switch(name){
            case "open":
                return "Open"
            case "closed":
                return "Closed"
            case "verified close":
                return "Closed By Patient";
        }
    }

    React.useEffect(() => {
        getMyRequests()
            .then(data => {
                setRequestsData(data.data)
            })
            .catch(err => {
            })
    },[])
    return(
        <div style={{padding: 20}}>
            <Typography>My Requests</Typography>
            <Grid container spacing={2} style={{marginTop: 20}}>
                {requestsData.length == 0 && <div style={{padding: 10}}>You don't have any requests right now. Click <a href="/need-help">here</a> to initiate a request.</div>}
                {requestsData.map((request, index) => 
                    <Grid key={index} item xs={12} onClick={() => handleClick(request)}>
                        <div style={{border: "1px solid black", padding: "10px 20px"}}>
                            <Typography>{request.code}</Typography>
                            <Typography>{request.patient_name}, {request.age}, {request.gender}</Typography>
                            <Typography>{request.locality.city.city}, {request.locality.locality_name}</Typography>
                            <Typography>Help Needed with oxygen</Typography>
                            <Typography>{getStatus(request.status)}</Typography>
                        </div>
                    </Grid>
                )}
                
                {/* <Grid item xs={12}>
                    <div style={{border: "1px solid black", padding: "10px 20px"}}>
                        <Typography>Ageiugasuya</Typography>
                        <Typography>Rahul Mehra, 44, male</Typography>
                        <Typography>Bangalore, RT Nagar</Typography>
                        <Typography>Help Needed with oxygen</Typography>
                        <Typography>Open 2 Daysn</Typography>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <div style={{border: "1px solid black", padding: "10px 20px"}}>
                        <Typography>Ageiugasuya</Typography>
                        <Typography>Rahul Mehra, 44, male</Typography>
                        <Typography>Bangalore, RT Nagar</Typography>
                        <Typography>Help Needed with oxygen</Typography>
                        <Typography>Open 2 Daysn</Typography>
                    </div>
                </Grid> */}
            </Grid>
        </div>
    )
}

export default Track;