import config from './config';

const instance = config('wallet');

export const initializeWallet = (data) => {
  return instance({
    method: 'POST',
    url: 'setup',
    data: data,
  });
};

export const getWalletDetails = (walletId) => {
  return instance({
    method: 'GET',
    url: walletId,
  });
};
