import React from 'react';
import { string, object } from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';

const GHLLoader = ({ style, color, ...restProps }) => {
  return <CircularProgress sx={style} color={color} {...restProps} />;
};

GHLLoader.propTypes = {
  style: object,
  color: string,
};

GHLLoader.defaultProps = {
  style: {},
  color: 'primary',
};

export default GHLLoader;
