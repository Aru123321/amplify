import React from 'react';
import { Typography } from '@material-ui/core';

const Header = (props) => {
    return(
        <div style={{background: "#fcfcfc", zIndex: 2, borderBottom: "1px solid #EFF0F2", borderBottomLeftRadius: 5, borderBottomRightRadius:5, padding: "10px 0px 50px 0px", textAlign: "center"}}>
            <Typography style={{fontSize: "24px"}}>{props.value}</Typography>
        </div>
    )
}

export default Header;