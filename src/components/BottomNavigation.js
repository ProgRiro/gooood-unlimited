import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
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
        label="トップ"
        icon={<HomeRoundedIcon />}
        component={Link}
        to="/top"
      />
      <BottomNavigationAction
        label="タイムライン"
        icon={<ListAltRoundedIcon />}
        component={Link}
        to="/timeline"
      />
      <BottomNavigationAction
        label="いいね"
        icon={<FavoriteIcon />}
        component={Link}
        to="/goodlist"
      />
    </BottomNavigation>
  );
};

export default SimpleBottomNavigation;
