import React, { useState, useContext, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  GHLText,
  GHLToggle,
  GHLLoader,
  GHLButton,
  GHLInputField,
} from '@components';
import { useNotification } from '@notify';
import { wallet, transaction } from '@core/services';
import { storage } from '@utils';
import { constants, config, functions } from '../../utils';
import { InitiateTransactionStyle } from '../../HomeStyle';

const InitiateTransaction = () => {
  const navigateTo = useNavigate();
  const { isWalletCreated } = useContext(config.authContext);
  const { checkAmountValidity } = functions;
  const {
    FETCH_WALLET_DETAILS_ERR_MSG,
    INCORRECT_AMOUNT_ERR_MSG,
    CANNOT_DEBIT_ERR_MSG,
    NO_DESCRIPTION_ERR_MSG,
    WALLET_NAME_FIELD_LABEL,
    BALANCE_FIELD_LABEL,
    INITIATE_TRANSACTION_HEADING,
    DEBIT_LABEL,
    CREDIT_LABEL,
    AMOUNT_FIELD_LABEL,
    DESCRIPTION_FIELD_LABEL,
    VIEW_TRNXS_BTN_LABEL,
  } = constants;
  const { errorNotification, successNotification } = useNotification();
  const [isCredit, setIsCredit] = useState(true);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState(' ');
  const [walletInfo, setWalletInfo] = useState({});
  const [isTransacting, setIsTransacting] = useState(false);
  const style = InitiateTransactionStyle(isCredit);

  useEffect(() => {
    (async () => {
      if (storage.get('walletId')) {
        const id = String(storage.get('walletId'));
        await wallet
          .getWalletDetails(id)
          .then((res) => {
            if (res.status) {
              setWalletInfo(res.data.data);
            } else {
              return errorNotification(res.msg);
            }
          })
          .catch(() => {
            return errorNotification(FETCH_WALLET_DETAILS_ERR_MSG);
          });
      }
    })();
  }, [isWalletCreated]);

  const transact = async () => {
    try {
      if (amount <= 0) {
        return errorNotification(INCORRECT_AMOUNT_ERR_MSG);
      }
      if (walletInfo.balance < amount && !isCredit) {
        return errorNotification(CANNOT_DEBIT_ERR_MSG);
      }
      if (description.trim() === '') {
        return errorNotification(NO_DESCRIPTION_ERR_MSG);
      }
      checkAmountValidity(amount);

      const trnxData = {
        amount: isCredit ? Math.abs(amount) : -Math.abs(amount),
        description: description.trim(),
      };
      setIsTransacting(true);

      await transaction
        .initiateTransaction(walletInfo._id, trnxData)
        .then((res) => {
          setIsTransacting(false);
          if (res.status) {
            setWalletInfo({ ...walletInfo, balance: res.data.data.balance });
            setAmount(0);
            setDescription(' ');
            return successNotification(res.data.message);
          } else {
            return errorNotification(res.data.message);
          }
        });
    } catch (err) {
      setIsTransacting(false);
      return errorNotification(err.message);
    }
  };

  return (
    <Box sx={style.boxWrapper}>
      <Grid container>
        <Grid item xs={4} sx={style.grid1} />
        <Grid item xs={8} sx={style.grid2}>
          <Box sx={style.walletInfoWrapper}>
            <Box sx={style.walletInfo}>
              <GHLText variant='h5'>{WALLET_NAME_FIELD_LABEL}</GHLText>
              <GHLText sx={style.walletData}>{walletInfo?.name}</GHLText>
            </Box>
            <Box sx={style.walletInfo}>
              <GHLText variant='h5'>{BALANCE_FIELD_LABEL}</GHLText>
              <GHLText sx={style.walletData}>
                {String(walletInfo?.balance)}
              </GHLText>
            </Box>
          </Box>
          <GHLText variant='h2' sx={style.pageHeading}>
            {INITIATE_TRANSACTION_HEADING}
          </GHLText>
          <Box sx={style.creditDebitWrapper}>
            <GHLButton
              variant='text'
              disabled={!Object.keys(walletInfo).length || isTransacting}
              sx={style.debitLabel}
              onClick={() => setIsCredit(false)}
            >
              {DEBIT_LABEL}
            </GHLButton>
            <GHLToggle
              sx={style.toggle}
              isDisabled={!Object.keys(walletInfo).length || isTransacting}
              isChecked={isCredit}
              handleSwitchCheck={() => {
                setIsCredit(!isCredit);
              }}
            />
            <GHLButton
              variant='text'
              disabled={!Object.keys(walletInfo).length || isTransacting}
              sx={style.creditLabel}
              onClick={() => setIsCredit(true)}
            >
              {CREDIT_LABEL}
            </GHLButton>
          </Box>
          <GHLInputField
            sx={style.textField}
            fullWidth={true}
            required={true}
            label={AMOUNT_FIELD_LABEL}
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            type='number'
            InputProps={{ inputProps: { min: 0 } }}
          />
          <GHLInputField
            sx={style.textField}
            fullWidth={true}
            required={true}
            label={DESCRIPTION_FIELD_LABEL}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <GHLButton
            sx={style.button}
            disabled={!Object.keys(walletInfo).length || isTransacting}
            onClick={() => transact()}
          >
            {isTransacting ? (
              <GHLLoader sx={style.loader} />
            ) : isCredit ? (
              CREDIT_LABEL
            ) : (
              DEBIT_LABEL
            )}
          </GHLButton>
          <GHLButton
            variant='text'
            disabled={!Object.keys(walletInfo).length || isTransacting}
            sx={style.button}
            onClick={() => navigateTo('/transactions')}
          >
            {VIEW_TRNXS_BTN_LABEL}
          </GHLButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InitiateTransaction;
