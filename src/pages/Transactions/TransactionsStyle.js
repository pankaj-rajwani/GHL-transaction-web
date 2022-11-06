import Images from '@assets';

const TableStyle = {
  tableContainer: {
    height: '400px',
    '&::-webkit-scrollbar': {
      width: '0.3em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'darkgrey',
    },
  },
  tablePagination: {
    width: '200rem',
  },
  tableHead: {
    '& tr': {
      '& th': {
        background: '#262626',
        color: '#fff',
      },
    },
  },
  tableBody: {
    '& tr': {
      '& td': {
        textAlign: 'center',
        '&:first-of-type': {
          textAlign: 'left',
        },
        '&:last-of-type': {
          textAlign: 'right',
        },
      },
    },
  },
  loaderWrapper: {
    textAlign: 'center !important',
    borderBottom: 'none',
    paddingTop: '15%',
  },
};

export const TransactionsStyle = {
  grid1: {
    backgroundImage: `url(${Images.transactions})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '400px 620px',
    width: '400px',
    height: '620px',
    margin: 0,
    padding: 0,
    filter: 'brightness(80%)',
  },
  grid2: {
    padding: '2%',
  },
  headingWrapper: {
    display: 'flex',
    marginBottom: '30px',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    right: 30,
    top: 45,
  },
  table: {
    ...TableStyle,
  },
};
