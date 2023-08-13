import React from 'react';
import propTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const StatsTable = ({ stats }) => {
  const statEntries = Object.entries(stats).filter(([_, value]) => typeof value !== 'boolean');

  return (
    <TableContainer 
      component={Paper} 
      style={{ maxHeight: '30vh', maxWidth: '70vw', overflow: 'auto' }}
      elevation={3}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: 25 }} align='center'>Stat</TableCell>
            <TableCell sx={{ fontSize: 25 }} align='center'>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {statEntries.length === 0 ? (
            <TableRow>
              <TableCell align='center' colSpan={2}>
                <Typography variant='body1'>No stats available. Please play the game first!</Typography>
              </TableCell>
            </TableRow>
          ) : (
            statEntries.map(([key, value]) => {
              const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
              return (
                <TableRow key={key}>
                  <TableCell sx={{ fontSize: 18 }} align='center'>{formattedKey}</TableCell>
                  <TableCell sx={{ fontSize: 18 }} align='center'>{value}</TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

StatsTable.propTypes = {
  stats: propTypes.object.isRequired,
};

export default StatsTable;
