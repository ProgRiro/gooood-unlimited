import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    // height: 50,
    zIndex: 99,
    backgroundColor: '#f1f2f6',
    borderTop: '1px solid rgba(0, 0, 0, 0.5)',
  },
});

const SimpleBottomNavigation = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      className={classes.root}
    >
      <BottomNavigationAction
        // label="トップ"
        icon={<HomeRoundedIcon />}
        component={Link}
        to="/top"
      />
      <BottomNavigationAction
        // label="タイムライン"
        icon={<ListAltRoundedIcon />}
        component={Link}
        to="/timeline"
      />
      <BottomNavigationAction
        // label="タイムライン"
        icon={<SearchIcon />}
        component={Link}
        to="/search"
      />
      <BottomNavigationAction
        // label="いいね"
        icon={<FavoriteIcon />}
        component={Link}
        to="/goodlist"
      />
    </BottomNavigation>
  );
};

export default SimpleBottomNavigation;
