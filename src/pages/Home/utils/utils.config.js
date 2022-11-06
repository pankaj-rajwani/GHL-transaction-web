import { createContext } from 'react';

export const authContext = createContext({
  isWalletCreated: false,
  setIsWalletCreated: (wallet) => {},
});
