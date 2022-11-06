import React from 'react';
import { number, func, object } from 'prop-types';
import { Box, IconButton } from '@mui/material';
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from '@mui/icons-material';

const PaginationActions = ({
  style,
  count,
  page,
  rowsPerPage,
  onPageChange,
}) => {
  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={style.wrapperBox}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label='first page'
      >
        <FirstPage />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        <LastPage />
      </IconButton>
    </Box>
  );
};

PaginationActions.propTypes = {
  style: object,
  count: number.isRequired,
  onPageChange: func.isRequired,
  page: number.isRequired,
  rowsPerPage: number.isRequired,
};

PaginationActions.defaultProps = {
  style: { wrapperBox: { flexShrink: 0, ml: 2.5 } },
};

export default PaginationActions;
