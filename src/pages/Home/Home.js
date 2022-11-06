import React, { useState } from 'react';
import { storage } from '@utils';
import { WalletSetup, InitiateTransaction } from './components';
import { config } from './utils';

const Home = () => {
  const { authContext } = config;
  const [isWalletCreated, setIsWalletCreated] = useState(false);

  return (
    <authContext.Provider value={{ isWalletCreated, setIsWalletCreated }}>
      {isWalletCreated || storage.get('walletId') ? (
        <InitiateTransaction />
      ) : (
        <WalletSetup />
      )}
    </authContext.Provider>
  );
};

export default Home;
