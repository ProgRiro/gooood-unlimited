import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import { Link } from 'react-router-dom';

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
        label="Home"
        icon={<HomeRoundedIcon />}
        component={Link}
        to="/timeline"
      />
      <BottomNavigationAction
        label="Good List"
        icon={<FavoriteIcon />}
        component={Link}
        to="/goodlist"
      />
      <BottomNavigationAction
        label="Setting"
        icon={<SettingsRoundedIcon />}
        component={Link}
        to="/setting"
      />
    </BottomNavigation>
  );
};

export default SimpleBottomNavigation;
