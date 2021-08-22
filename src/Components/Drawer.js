import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Accordion from "./Accordion";
import CloseIcon from '@material-ui/icons/Close';
import AppsIcon from '@material-ui/icons/Apps';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import { Divider } from '@material-ui/core';
import {getToken} from "../Functions/functions";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles({
  list: {
    width: "100vw",
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Accordion />
    </div>
  );

  return (
    <div>
        <React.Fragment>
          <Drawer anchor={'left'} open={props.open} onClose={toggleDrawer('left', false)}>
                <div style={{marginTop: 40}}>
                <List className={classes.list}>
                  <ListItem onClick={() => window.location.href = "/"}>
                    <ListItemAvatar>
                      <Avatar>
                        <AppsIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Home" />
                  </ListItem>
                  <Divider />
                    <>
                      <ListItem onClick={() => window.location.href = "/need-help"}>
                        <ListItemAvatar>
                          <Avatar>
                            <AddCircleIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="New Request" />
                      </ListItem>
                      <Divider />
                    </>
                  {getToken() &&
                    <>
                      <ListItem onClick={() => window.location.href = "/track"}>
                        <ListItemAvatar>
                          <Avatar>
                            <AssignmentIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="My Requests" />
                      </ListItem>
                      <Divider />  
                    </>
                  }

                  {getToken() &&
                    <>
                      <ListItem onClick={() => window.location.href = "/my-favourites"}>
                        <ListItemAvatar>
                          <Avatar>
                            <FavoriteBorderIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="My Favourites" />
                      </ListItem>
                      <Divider />  
                    </>
                  }

                  {!getToken() && 
                    <>
                      <ListItem onClick={() => window.location.href = "/login"}>
                        <ListItemAvatar>
                          <Avatar>
                            <LockOpenIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Login" />
                      </ListItem>
                      <Divider />
                    </>
                  }
                  {getToken() && 
                    <>
                      <ListItem onClick={() => window.location.href = "/logout"}>
                        <ListItemAvatar>
                          <Avatar>
                            <LockIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Logout" />
                      </ListItem>
                      <Divider />
                    </>
                  }
                </List>
                    <CloseIcon onClick={props.handleCloseDrawer} style={{position: 'absolute', top: 15, right: 15}} />
                </div>
          </Drawer>
        </React.Fragment>
    </div>
  );
}