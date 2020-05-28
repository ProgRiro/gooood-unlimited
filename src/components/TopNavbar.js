import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import firebase from '../config';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  confirmBox: {
    width: 300,
    padding: 15,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    textAlign: 'center',
  },
  confirmButton: {
    margin: theme.spacing(1),
    width: 100,
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        setAuth(true);
      } else {
        // No user is signed in.
        setAuth(false);
      }
    });
  }, []);

  const handleLogout = () => {
    if (firebase.auth().currentUser == null) {
      return;
    }

    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
        setAuth(false);
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  const confirmLogout = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <Box className={classes.confirmBox}>
            <h1>Confirm to Logout</h1>
            <p>ログアウトしますか？</p>
            <Button
              className={classes.confirmButton}
              variant="contained"
              color="primary"
              onClick={() => {
                handleLogout();
                onClose();
              }}
            >
              はい
            </Button>
            <Button
              className={classes.confirmButton}
              variant="contained"
              color="secondary"
              onClick={onClose}
            >
              いいえ
            </Button>
          </Box>
        );
      },
    });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} align="left">
            👍　Good Unlimited　👍
          </Typography>
          {auth && (
            <IconButton
              aria-label="logout button"
              onClick={confirmLogout}
              color="inherit"
            >
              <ExitToAppRoundedIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
