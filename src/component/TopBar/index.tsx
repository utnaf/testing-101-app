import React from 'react';
import { AppBar, Toolbar, Typography, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

export const TopBar = props => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Link component={RouterLink} to="/">
          <Typography variant="h6" style={{ color: 'white' }}>
            Parking Lot Manager
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
