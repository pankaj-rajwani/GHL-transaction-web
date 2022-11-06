import config from './config';

const instance = config('transaction');

export const initiateTransaction = (walletId, data) => {
  return instance({
    method: 'POST',
    url: `transact/${walletId}`,
    data: data,
  });
};

export const fecthTransactions = (walletId, skip, limit) => {
  return instance({
    method: 'GET',
    url: '',
    params: {
      walletId,
      skip,
      limit,
    },
  });
};
