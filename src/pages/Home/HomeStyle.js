import Images from '@assets';

export const WalletSetupStyle = {
  boxWrapper: {
    textAlign: 'center',
  },
  grid1: {
    padding: '12%',
  },
  heading: {
    marginBottom: '30px',
  },
  textField: {
    width: '80%',
    marginBottom: '30px',
  },
  button: {
    width: '80%',
  },
  loader: {
    fill: '#fff',
  },
  grid2: {
    backgroundImage: `url(${Images.walletSetup})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '500px 620px',
    width: '500px',
    height: '620px',
    margin: 0,
    padding: 0,
    filter: 'brightness(80%)',
  },
};

export const InitiateTransactionStyle = (isCredit) => {
  return {
    boxWrapper: {
      textAlign: 'center',
    },
    grid1: {
      backgroundImage: `url(${
        isCredit ? Images.initiateCredit : Images.initiateDebit
      })`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '500px 620px',
      width: '500px',
      height: '620px',
      margin: 0,
      padding: 0,
      filter: 'brightness(80%)',
    },
    grid2: {
      padding: '5%',
      display: 'block',
    },
    walletInfo: {
      display: 'flex',
      marginBottom: '10px',
    },
    walletInfoWrapper: {
      display: 'flex',
      marginLeft: '30%',
    },
    walletData: {
      margin: '6px 20px 0px 10px',
    },
    pageHeading: {
      marginBottom: '30px',
    },
    textField: {
      width: '80%',
      marginBottom: '30px',
    },
    button: {
      width: '80%',
      marginBottom: '20px',
    },
    loader: {
      fill: '#fff',
    },
    creditDebitWrapper: {
      display: 'flex',
      marginLeft: '40%',
      marginBottom: '20px',
    },
    toggle: {
      '& .MuiSwitch-switchBase': {
        '&.Mui-checked': {
          '& .MuiSwitch-thumb:before': {
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(${Images.credit})`,
            backgroundSize: 'cover',
            marginTop: '6px',
          },
          '& + .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: '#1565c0 !important',
          },
        },
      },
      '& .MuiSwitch-thumb': {
        backgroundColor: 'transparent',
        '&:before': {
          content: "''",
          position: 'absolute',
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: `url(${Images.debit})`,
          backgroundSize: 'cover',
          marginBottom: '6px',
        },
      },
      '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#1565c0 !important',
      },
    },
  };
};
