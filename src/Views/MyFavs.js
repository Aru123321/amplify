import { Typography, Grid } from '@material-ui/core';
import React from 'react';
import {getMyFavs} from "../Api/api";
import { useHistory } from "react-router-dom";

const Track = () => {
    const history = useHistory();
    const [requestsData, setRequestsData] = React.useState([]);

    const handleClick = (request) => {
        history.push("/help/"+request.help.code)
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
        getMyFavs()
            .then(data => {
                setRequestsData(data.data)
            })
            .catch(err => {
            })
    },[])
    return(
        <div style={{padding: 20}}>
            <Typography>My Favourites</Typography>
            <Grid container spacing={2} style={{marginTop: 20}}>
                {requestsData.length == 0 && <div style={{padding: 10}}>You don't have any favourites right now. Click <a href="/">here</a> to see people asking for help</div>}
                {requestsData.map((request, index) => 
                    <Grid key={index} item xs={12} onClick={() => handleClick(request)}>
                        <div style={{border: "1px solid black", padding: "10px 20px"}}>
                            <Typography>{request.help.code}</Typography>
                            <Typography>{request.help.user.name}, 44, male</Typography>
                            <Typography>{request.help.locality.city.city}, {request.help.locality.locality_name}</Typography>
                            <Typography>{request.help.category.category_name}</Typography>
                            <Typography>{getStatus(request.status)}</Typography>
                        </div>
                    </Grid>
                )}
            </Grid>
        </div>
    )
}

export default Track;