import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

export const TopBar = props => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6">Parking Lot Manager</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
