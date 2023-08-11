import React, { useEffect, useRef } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const GameLogDisplay = (props) => {
  const gameLog = props.gameLog;

  const playerShots = gameLog.filter((_, index) => index % 2 === 0);
  const aiShots = gameLog.filter((_, index) => index % 2 !== 0);

  const longest = Math.max(playerShots.length, aiShots.length);

  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [gameLog]);

  return (
    <>
      <Typography>Game Log</Typography>
      <TableContainer component={Paper} style={{ height: 200, overflowY: 'auto', overflowX: 'hidden' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell style={{ padding: 0 }}><Typography color='primary'>Player</Typography></TableCell>
              <TableCell style={{ padding: 0 }}><Typography color='error'>AI</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(longest).keys()].map((_, index) => (
              <TableRow key={index}>
                <TableCell style={{ padding: 0 }}>
                  <Typography fontSize={16}>
                    {index + 1}.
                  </Typography>
                </TableCell>
                <TableCell style={{ padding: 0 }}>
                  <Typography color='primary' fontSize={14}>{playerShots[index]}</Typography>
                </TableCell>
                <TableCell style={{ padding: 0 }}>
                  <Typography color='error' fontSize={14}>{aiShots[index]}</Typography>
                </TableCell>
              </TableRow>
            ))}
            <TableRow ref={logEndRef} />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
};

export default GameLogDisplay;
