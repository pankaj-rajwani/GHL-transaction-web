import React from 'react';
import { object, bool, func } from 'prop-types';
import { Switch } from '@mui/material';

const GHLToggle = ({
  style,
  isChecked,
  isDisabled,
  handleSwitchCheck,
  ...restProps
}) => {
  return (
    <Switch
      sx={style.toggle}
      disabled={isDisabled}
      checked={isChecked}
      onChange={handleSwitchCheck}
      {...restProps}
    />
  );
};

GHLToggle.propTypes = {
  style: object,
  isChecked: bool,
  isDisabled: bool,
  handleSwitchCheck: func,
};

GHLToggle.defaultProps = {
  style: {},
  isChecked: true,
  isDisabled: false,
  handleSwitchCheck: () => {},
};
export default GHLToggle;
