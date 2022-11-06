import React from 'react';
import { string, object } from 'prop-types';
import Typography from '@mui/material/Typography';

const GHLText = ({ children, style, variant, ...restProps }) => {
  return (
    <Typography variant={variant} sx={style} {...restProps}>
      {children}
    </Typography>
  );
};

GHLText.propTypes = {
  children: string,
  style: object,
  variant: string,
};

GHLText.defaultProps = {
  children: ' ',
  style: {},
  variant: 'body1',
};

export default GHLText;
