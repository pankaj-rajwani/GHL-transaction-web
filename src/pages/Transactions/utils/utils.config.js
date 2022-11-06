import React from 'react';
import Box from '@mui/material/Box';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import { GHLText, GHLChip } from '@components';
import {
  COLUMN_1,
  COLUMN_2,
  COLUMN_3,
  COLUMN_4,
  COLUMN_5,
  COLUMN_6,
} from './utils.constants';

export const columns = (sortTableData) => [
  {
    component: (
      <Box sx={{ display: 'flex' }}>
        <GHLText variant='h6'>{COLUMN_1}</GHLText>
        <ArrowCircleUpIcon
          sx={{ cursor: 'pointer', margin: '5px 0 0 5px' }}
          onClick={() => {
            sortTableData('amount');
          }}
        />
      </Box>
    ),
  },
  {
    component: (
      <GHLText align='center' variant='h6'>
        {COLUMN_2}
      </GHLText>
    ),
  },
  {
    component: (
      <GHLText align='center' variant='h6'>
        {COLUMN_3}
      </GHLText>
    ),
  },
  {
    component: (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <GHLText variant='h6'>{COLUMN_4}</GHLText>
        <ArrowCircleUpIcon
          sx={{ cursor: 'pointer', margin: '5px 0 0 5px' }}
          onClick={() => {
            sortTableData('createdAt');
          }}
        />
      </Box>
    ),
  },
  {
    component: (
      <GHLText align='center' variant='h6'>
        {COLUMN_5}
      </GHLText>
    ),
  },
  {
    component: (
      <GHLText align='right' variant='h6'>
        {COLUMN_6}
      </GHLText>
    ),
  },
];

export const rows = (rowsData) => {
  return rowsData.map(
    ({ amount, type, description, balanceBefore, balanceAfter, createdAt }) => {
      return {
        component: (data) => {
          if (typeof data === 'string') {
            return <GHLText>{data}</GHLText>;
          }
          if (typeof data === 'object') {
            return (
              <Box sx={{ textAlign: 'center' }}>
                <GHLChip
                  sx={{ width: '100%' }}
                  label={data.value}
                  color={data.value === 'CREDIT' ? 'primary' : 'secondary'}
                />
              </Box>
            );
          }
        },

        data: {
          col1: Math.abs(amount) + '',
          col2: {
            value: type,
          },
          col3: description,
          col4: new Date(createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          col5: balanceBefore + '',
          col6: balanceAfter + '',
        },
      };
    }
  );
};

export const rowsPerPageOptions = (totalRows) => [
  5,
  10,
  15,
  { label: 'All', value: totalRows },
];
