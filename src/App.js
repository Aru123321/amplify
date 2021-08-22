import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NeedHelp from "./Views/NeedHelp";
import Login from "./Views/Login";
import Volunteer from "./Views/Volunteer";
import Dashboard from "./Views/Dashboard";
import Help from "./Views/Help";
import Track from "./Views/Track";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "./Components/Drawer";
import MyFavs from "./Views/MyFavs";
import { Scrollbars }from "react-custom-scrollbars";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
  Redirect,
} from "react-router-dom";
import Logout from "./Views/Logout";

function setToken(userToken) {
  console.log(userToken);
  localStorage.setItem("token", userToken);
}

function getToken() {
  const tokenString = localStorage.getItem('token');
  return tokenString
}

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}


function LoginRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to={{pathname: '/need-help', state: {from: props.location}}} />}
    />
  )
}

function App() {
  const token = getToken();
  const [openDrawer, setOpenDrawer] = React.useState(false);

  return (
  <Scrollbars
      style={{ width: 450, height: 800, align: "center", margin: "auto" }}
    >
      <div style={{ maxWidth: 420, margin: "auto" }}>
        <div style={{ padding: 16 }}>
          <MenuIcon onClick={() => setOpenDrawer(true)} />
        </div>
        <Router>
          <Switch>
            <Route
              exact
              path="/help/:code"
              authed={token ? true : false}
              component={Help}
            />
            <Route
              exact
              path="/"
              authed={token ? true : false}
              component={Volunteer}
            />
            <PrivateRoute
              exact
              path="/track"
              authed={token ? true : false}
              component={Track}
            />
            <PrivateRoute
              exact
              path="/my-favourites"
              authed={token ? true : false}
              component={MyFavs}
            />
            <Route
              token={token}
              path="/need-help"
              authed={token ? true : false}
              component={() => <NeedHelp token={token} />}
            />
            <Route path="/logout" component={Logout} />
            <LoginRoute
              authed={token ? true : false}
              path="/login"
              component={() => <Login setToken={setToken} />}
            />
            {/* <PrivateRoute authed={token?true:false} toke={token} path='/need-help' component={NeedHelp} /> */}
          </Switch>
        </Router>
        <Drawer
          open={openDrawer}
          handleCloseDrawer={() => setOpenDrawer(false)}
        />
      </div>
    </Scrollbars>
    
  );
}

export default App;
