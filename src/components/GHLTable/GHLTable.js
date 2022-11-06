import React from 'react';
import { any, arrayOf, shape, object, number, func, bool } from 'prop-types';
import {
  Box,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableFooter,
  TableContainer,
  TablePagination,
} from '@mui/material';
import GHLLoader from '../GHLLoader';
import PaginationActions from './utils/PaginationActions';

const GHLTable = ({
  style,
  rows,
  columns,
  tableContainerProps,
  tableProps,
  rowsPerPageOptions,
  totalRowsCount,
  rowsPerPage,
  currentPage,
  handleChangePage,
  handleChangeRowsPerPage,
  isDataLoading,
}) => {
  return (
    <Box style={style.boxWrapper}>
      <TableContainer sx={style.tableContainer} {...tableContainerProps}>
        <Table sx={style.table} {...tableProps}>
          <TableHead sx={style.tableHead}>
            <TableRow>
              {columns.map((item, index) => {
                const { component, otherCellProps } = item;
                return (
                  <TableCell {...otherCellProps} key={index}>
                    {component}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody sx={style.tableBody}>
            {!isDataLoading ? (
              rows.map((rowItem, index) => {
                const { data, component } = rowItem;
                return (
                  <TableRow key={index}>
                    {Object.keys(data).map((key, cellIndex) => (
                      <TableCell key={cellIndex}>
                        {component(data[key])}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={12} sx={style.loaderWrapper}>
                  <GHLLoader sx={style.loader} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Table>
        <TableFooter>
          <TableRow>
            <TablePagination
              sx={style.tablePagination}
              rowsPerPageOptions={rowsPerPageOptions}
              colSpan={3}
              count={totalRowsCount}
              rowsPerPage={rowsPerPage}
              page={currentPage}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={PaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Box>
  );
};

GHLTable.propTypes = {
  style: object,
  tableContainerProps: any,
  tableProps: object,
  rows: arrayOf(
    shape({
      data: object,
      component: any,
    })
  ).isRequired,
  columns: arrayOf(
    shape({
      otherCellProps: object,
      component: object,
    })
  ).isRequired,
  rowsPerPageOptions: any.isRequired,
  totalRowsCount: number.isRequired,
  rowsPerPage: number,
  currentPage: number,
  handleChangePage: func.isRequired,
  handleChangeRowsPerPage: func.isRequired,
  isDataLoading: bool.isRequired,
};

GHLTable.defaultProps = {
  style: {},
  tableContainerProps: {},
  tableProps: {},
  rowsPerPage: 5,
  currentPage: 0,
};

export default GHLTable;
