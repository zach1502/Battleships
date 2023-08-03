import React from 'react';
import propTypes from 'prop-types';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const StatsTable = ({ stats }) => {
  const statEntries = Object.entries(stats);

  return (
    <TableContainer 
      component={Paper} 
      style={{ maxHeight: '30vh', maxWidth: '70vw', overflow: 'auto' }}
      elevation={3}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align="center">Stat</TableCell>
            <TableCell align="center">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {statEntries.map(([key, value]) => {
            if (typeof value === 'boolean') return null;
            const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
            return(
              <TableRow key={key}>
                <TableCell align="center">{formattedKey}</TableCell>
                <TableCell align="center">{value}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
};

StatsTable.propTypes = {
  stats: propTypes.object.isRequired,
};

export default StatsTable;
