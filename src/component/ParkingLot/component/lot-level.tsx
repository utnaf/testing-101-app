import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@material-ui/core';

import getClasses from './style';

export interface ILotLevel {
  total: number;
  count: number;
}

const EMERGENCY_LEVEL = 80;

export const LotLevel = (props: ILotLevel) => {
  const { total, count } = props;
  const classes = getClasses();

  const progress = (100 / total) * count;

  const handleClasses = () => {
    const processedClasses = [classes.lotLevel];

    if (progress >= EMERGENCY_LEVEL) {
      processedClasses.push(classes.lotLevelEmergency);
    }

    return processedClasses.join(' ');
  };

  return (
    <Box id="lot-level-box" display="flex" justifyContent="center" flexDirection="column" className={handleClasses()}>
      <CircularProgress className={classes.circularProgress} variant="static" value={progress} />
      <Box mt={1}>
        <Typography align="center">
          {count} / {total}
        </Typography>
      </Box>
    </Box>
  );
};

export default ILotLevel;
