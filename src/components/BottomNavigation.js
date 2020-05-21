import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
});

const SimpleBottomNavigation = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label="タイムライン"
        icon={<RestoreIcon />}
        component={Link}
        to="/timeline"
      />
      <BottomNavigationAction
        label="いいね 一覧"
        icon={<FavoriteIcon />}
        component={Link}
        to="/goodlist"
      />
      <BottomNavigationAction
        label="設定"
        icon={<LocationOnIcon />}
        component={Link}
        to="/setting"
      />
    </BottomNavigation>
  );
};

export default SimpleBottomNavigation;
