import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';

import getClasses from './style';
import Loader from 'src/shared/components/Loader';

const baseSearch = 'https://source.unsplash.com/featured/?parking';

export interface IImageSelectorProps {
  setImageUrl: (imageUrl: string) => void;
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
        const imageUrl = res.request.responseURL;
        props.setImageUrl(imageUrl);
        setBgImage(imageUrl);
      })
      .then(() => setLoading(false));
  };

  useEffect(() => {
    if (bgImage === null) {
      refreshImage();
    }
  });

  return (
    <Box id="image-selector-box" className={classes.root} onClick={refreshImage} style={{ backgroundImage: `url(${bgImage})` }}>
      <Loader visible={loading} />
    </Box>
  );
};

export default ImageSelector;
