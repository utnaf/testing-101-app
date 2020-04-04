import { Box, CircularProgress } from '@material-ui/core';
import React from 'react';
import getClasses from './style';

export interface ILoaderProps {
  visible: boolean;
}

export const Loader = (props: ILoaderProps) => {
  const classes = getClasses();

  return props.visible ? (
    <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" className={classes.root}>
      <CircularProgress />
    </Box>
  ) : (
    <></>
  );
};

export default Loader;
