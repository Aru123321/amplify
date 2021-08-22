import React from "react";

const Logout = () => {

    React.useEffect(() => {
        localStorage.removeItem("token");
        window.location.href = "/login"
    },[])
    return(
        <div>
        </div>
    )
}

export default Logout;