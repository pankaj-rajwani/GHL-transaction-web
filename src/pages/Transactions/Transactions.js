import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GHLTable, GHLText, GHLButton, GHLLoader } from '@components';
import { transaction } from '@core/services';
import { storage } from '@utils';
import { useNotification } from '@notify';
import { config, constants, functions } from './utils';
import { TransactionsStyle as style } from './TransactionsStyle';

const Transactions = () => {
  const navigateTo = useNavigate();
  const { columns, rows, rowsPerPageOptions } = config;
  const { PAGE_HEADING, EXPORT_TO_CSV_BTN_TEXT, SETUP_WALLET_ERR_MSG } =
    constants;
  const { errorNotification } = useNotification();
  const [tableData, setTableData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [isTrnxsLoading, setIsTrnxsLoading] = useState(false);
  const [isCsvDownloading, setIsCsvDownloading] = useState(false);
  const walletId = storage.get('walletId');

  const downloadTrnxsCsv = async () => {
    setIsCsvDownloading(true);
    await transaction
      .fecthTransactions(walletId, 0, tableData.totalPages)
      .then((res) => {
        functions.exportTrnxsToCsv(res.data.data.trnxs);
        setIsCsvDownloading(false);
      })
      .catch((err) => {
        setIsCsvDownloading(false);
        return errorNotification(err.message);
      });
  };

  const sortTableData = (key) => {
    setTableData({
      ...tableData,
      trnxs: tableData.trnxs?.sort((a, b) => {
        if (key === 'amount') {
          return Math.abs(a[key]) > Math.abs(b[key])
            ? 1
            : Math.abs(b[key]) > Math.abs(a[key])
            ? -1
            : 0;
        }
        return a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0;
      }),
    });
  };

  useEffect(() => {
    if (!walletId) {
      errorNotification(SETUP_WALLET_ERR_MSG);
      navigateTo('/');
    }
    (async () => {
      setIsTrnxsLoading(true);
      await transaction
        .fecthTransactions(walletId, rowsPerPage * currentPage, rowsPerPage)
        .then((res) => {
          setTableData(res.data.data);
          setIsTrnxsLoading(false);
        })
        .catch((err) => {
          setIsTrnxsLoading(false);
          return errorNotification(err.message);
        });
    })();
  }, [currentPage, rowsPerPage]);

  return (
    <Box>
      <Grid container>
        <Grid item xs={3} sx={style.grid1} />
        <Grid item xs={9} sx={style.grid2}>
          <Box sx={style.headingWrapper}>
            <GHLText variant='h3' sx={style.pageHeading}>
              {PAGE_HEADING}
            </GHLText>
            <GHLButton
              disabled={!tableData.trnxs || isCsvDownloading}
              sx={style.button}
              onClick={() => downloadTrnxsCsv()}
            >
              {isCsvDownloading ? <GHLLoader /> : EXPORT_TO_CSV_BTN_TEXT}
            </GHLButton>
          </Box>
          <GHLTable
            tableProps={{ stickyHeader: true }}
            style={style.table}
            isDataLoading={isTrnxsLoading}
            columns={columns(sortTableData)}
            rows={rows(tableData.trnxs || [])}
            totalRowsCount={tableData.totalPages || 0}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            handleChangePage={(event, page) => {
              setTableData([]);
              setCurrentPage(page);
            }}
            handleChangeRowsPerPage={() => {
              setTableData([]);
              setRowsPerPage(parseInt(event.target.value, 10));
              setCurrentPage(0);
            }}
            rowsPerPageOptions={rowsPerPageOptions(tableData.totalPages || 0)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Transactions;
