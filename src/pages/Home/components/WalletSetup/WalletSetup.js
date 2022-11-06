import React, { useState, useContext } from 'react';
import { Box, Grid } from '@mui/material';
import { GHLText, GHLLoader, GHLButton, GHLInputField } from '@components';
import { useNotification } from '@notify';
import { wallet } from '@core/services';
import { storage } from '@utils';
import { constants, config, functions } from '../../utils';
import { WalletSetupStyle as style } from '../../HomeStyle';

const WalletSetup = () => {
  const { setIsWalletCreated } = useContext(config.authContext);
  const {
    NAME_IS_EMPTY_ERR_MSG,
    INCORRECT_BALANCE_ERR_MSG,
    WALLET_SETUP_HEADING,
    WALLET_NAME_FIELD_LABEL,
    BALANCE_FIELD_LABEL,
  } = constants;
  const { checkAmountValidity } = functions;
  const { errorNotification, successNotification } = useNotification();
  const [walletName, setWalletName] = useState(' ');
  const [balance, setBalance] = useState(0);
  const [settingUpWallet, setSettingUpWallet] = useState(false);

  const setupWallet = async () => {
    try {
      if (walletName.trim() === '') {
        return errorNotification(NAME_IS_EMPTY_ERR_MSG);
      } else if (balance < 0) {
        return errorNotification(INCORRECT_BALANCE_ERR_MSG);
      }
      setSettingUpWallet(true);

      await wallet
        .initializeWallet({
          name: walletName.trim(),
          balance: checkAmountValidity(balance),
        })
        .then((res) => {
          setSettingUpWallet(false);
          if (res.status) {
            setWalletName(' ');
            setBalance(0);
            setIsWalletCreated(true);
            storage.set('walletId', res.data.data._id);
            return successNotification(res.data.message);
          } else {
            return errorNotification(res.data.message);
          }
        });
    } catch (err) {
      setSettingUpWallet(false);
      return errorNotification(err.message);
    }
  };

  return (
    <Box sx={style.boxWrapper}>
      <Grid container>
        <Grid item xs={8} sx={style.grid1}>
          <GHLText variant='h2' sx={style.heading}>
            {WALLET_SETUP_HEADING}
          </GHLText>
          <GHLInputField
            sx={style.textField}
            fullWidth={true}
            required={true}
            label={WALLET_NAME_FIELD_LABEL}
            value={walletName}
            onChange={(e) => {
              setWalletName(e.target.value);
            }}
          />
          <GHLInputField
            sx={style.textField}
            fullWidth={true}
            label={BALANCE_FIELD_LABEL}
            value={balance}
            onChange={(e) => {
              setBalance(e.target.value);
            }}
            type='number'
            InputProps={{ inputProps: { min: 0 } }}
          />
          <GHLButton
            sx={style.button}
            fullWidth={true}
            disabled={settingUpWallet}
            onClick={() => setupWallet()}
          >
            {settingUpWallet ? <GHLLoader sx={style.loader} /> : 'Setup'}
          </GHLButton>
        </Grid>
        <Grid item xs={4} sx={style.grid2}></Grid>
      </Grid>
    </Box>
  );
};

export default WalletSetup;
