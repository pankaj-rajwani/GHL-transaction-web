import React from 'react';
import { any, string, func, object } from 'prop-types';
import Button from '@mui/material/Button';

const GHLButton = ({
  style,
  color,
  onClick,
  variant,
  children,
  ...restProps
}) => {
  return (
    <Button
      variant={variant}
      sx={style}
      onClick={onClick}
      color={color}
      {...restProps}
    >
      {children}
    </Button>
  );
};

GHLButton.propTypes = {
  style: object,
  color: string,
  onClick: func,
  variant: string,
  children: any,
};

GHLButton.defaultProps = {
  style: {},
  color: 'primary',
  onClick: () => {},
  variant: 'contained',
  children: 'Button',
};

export default GHLButton;
