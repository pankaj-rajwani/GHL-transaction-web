import React from 'react';
import { string, object } from 'prop-types';
import TextField from '@mui/material/TextField';

const InputField = ({ style, variant, ...restProps }) => {
  return <TextField sx={style} variant={variant} {...restProps} />;
};

InputField.propTypes = {
  style: object,
  variant: string,
};

InputField.defaultProps = {
  style: {},
  variant: 'outlined',
};

export default InputField;
