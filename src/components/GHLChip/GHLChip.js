import React from 'react';
import { string, object } from 'prop-types';
import Chip from '@mui/material/Chip';

const GHLChip = ({ style, label, ...restProps }) => {
  return <Chip sx={style} label={label} {...restProps} />;
};

GHLChip.propTypes = {
  style: object,
  label: string.isRequired,
};

GHLChip.defaultProps = {
  style: {},
};

export default GHLChip;
