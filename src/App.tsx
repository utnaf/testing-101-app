import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const App = () => {
  return (
    <BrowserRouter>
      <AppBar>
        <Toolbar>
          <Typography variant="h6">Parking Lot Manager</Typography>
        </Toolbar>
      </AppBar>
    </BrowserRouter>
  );
};

export default App;
