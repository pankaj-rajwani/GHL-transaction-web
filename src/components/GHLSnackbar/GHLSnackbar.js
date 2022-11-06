import React from 'react';
import {
  oneOf,
  string,
  element,
  number,
  shape,
  object,
  func,
} from 'prop-types';
import { Zoom } from '@mui/material';
import { SnackbarProvider, useSnackbar } from 'notistack';

export const useNotification = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const successNotification = (message, options) => {
    enqueueSnackbar(message, { variant: 'success', ...options });
  };
  const errorNotification = (message, options) => {
    enqueueSnackbar(message, { variant: 'error', ...options });
  };
  const defaultNotification = (message, options) => {
    enqueueSnackbar(message, { variant: 'default', ...options });
  };
  const closeNotification = (key) => {
    closeSnackbar(key);
  };
  return {
    successNotification,
    errorNotification,
    defaultNotification,
    closeNotification,
  };
};

const GHLSnackbar = ({
  action,
  variant,
  maxSnack,
  children,
  anchorOrigin,
  TransitionComponent,
  autoHideDuration,
  ...otherProps
}) => (
  <SnackbarProvider
    {...otherProps}
    variant={variant}
    anchorOrigin={anchorOrigin}
    autoHideDuration={autoHideDuration}
    TransitionComponent={TransitionComponent}
    maxSnack={maxSnack}
    action={action}
  >
    {children}
  </SnackbarProvider>
);

GHLSnackbar.propTypes = {
  maxSnack: number,
  anchorOrigin: shape({
    vertical: string,
    horizontal: string,
  }),
  TransitionComponent: object,
  children: element.isRequired,
  variant: oneOf(['info', 'success', 'warning', 'error', 'default']),
  autoHideDuration: number,
  action: func,
};

GHLSnackbar.defaultProps = {
  maxSnack: 3,
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'center',
  },
  TransitionComponent: Zoom,
  variant: 'default',
  autoHideDuration: 5000,
  action: () => {},
};

export default GHLSnackbar;
