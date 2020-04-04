import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';

import getClasses from './style';
import Loader from 'src/shared/components/Loader';

const baseSearch = 'https://source.unsplash.com/featured/?parking%20lot';

export interface IImageSelectorProps {
  setImageUrl: Function;
}

export const ImageSelector = (props: IImageSelectorProps) => {
  const [bgImage, setBgImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const classes = getClasses();

  const refreshImage = () => {
    setLoading(true);
    axios
      .get(baseSearch)
      .then(res => {
        setBgImage(res.request.responseURL);
      })
      .then(() => setLoading(false));
  };

  useEffect(() => {
    props.setImageUrl(bgImage);
  }, [bgImage]);

  useEffect(() => {
    if (bgImage === null) {
      refreshImage();
    }
  });

  return (
    <Box className={classes.root} onClick={refreshImage} style={{ backgroundImage: `url(${bgImage})` }}>
      <Loader visible={loading} />
    </Box>
  );
};

export default ImageSelector;
