import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import TopBar from 'src/component/TopBar';
import { CssBaseline, Container } from '@material-ui/core';

import getStyles from 'src/app.style';
import Routes from './shared/routes';

const App = () => {
  const classes = getStyles();
  return (
    <BrowserRouter>
      <CssBaseline />
      <TopBar />
      <Container maxWidth="xl" component="main" className={classes.root}>
        <div className={classes.viewRoutes}>
          <Routes />
        </div>
      </Container>
    </BrowserRouter>
  );
};

export default App;
