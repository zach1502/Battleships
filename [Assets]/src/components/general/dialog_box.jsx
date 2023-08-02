import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, List, ListItemButton, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DialogBox = ({ open, handleClose, titleContentPairs, buttonText }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageSelection = (index) => {
    setCurrentPage(index);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>
        {titleContentPairs[currentPage].title}
        <Button onClick={handleClose} style={{ float: 'right' }}>
          <CloseIcon />
        </Button>
      </DialogTitle>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <List>
            {titleContentPairs.map((pair, index) => (
              <ListItemButton 
                key={index}
                selected={index === currentPage}
                onClick={() => handlePageSelection(index)}
              >
                {pair.title}
              </ListItemButton>
            ))}
          </List>
        </Grid>
        <Grid item xs={8}>
          <DialogContent>
            <DialogContentText style={{ whiteSpace: 'pre-wrap' }}>
              {titleContentPairs[currentPage].content}
            </DialogContentText>
          </DialogContent>
        </Grid>
      </Grid>
      <DialogActions>
        <Button onClick={handleClose}>
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogBox.propTypes = {
  open: propTypes.bool.isRequired,
  handleClose: propTypes.func.isRequired,
  titleContentPairs: propTypes.arrayOf(propTypes.shape({
    title: propTypes.string.isRequired,
    content: propTypes.string.isRequired,
  })).isRequired,
  buttonText: propTypes.string.isRequired,
};

export default DialogBox;
