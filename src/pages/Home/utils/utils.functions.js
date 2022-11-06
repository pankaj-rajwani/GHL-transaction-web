import { AMOUNT_CHECK_ERR_MSG } from './utils.constants';

export const checkAmountValidity = (amount) => {
  if (Number.isInteger(amount * 1)) {
    return parseFloat(amount);
  } else if (amount.toString().split('.')[1]?.length <= 4) {
    return parseFloat(amount);
  } else {
    throw new Error(AMOUNT_CHECK_ERR_MSG);
  }
};
