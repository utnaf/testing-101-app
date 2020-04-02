import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import TopBar from 'src/component/TopBar';
import { Grid, CssBaseline } from '@material-ui/core';

import getStyles from 'src/app.style';
import Routes from './shared/routes';

const App = () => {
  const classes = getStyles();
  return (
    <BrowserRouter>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Routes />
      </Grid>
    </BrowserRouter>
  );
};

export default App;
