import React, { useState } from 'react';
import propTypes from 'prop-types';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

const EditField = ({ username, setUsername }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState(username);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCheckClick = () => {
    setUsername(tempUsername);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setTempUsername(username);
    setIsEditing(false);
  };

  return (
    <TextField 
      label='Username' 
      value={isEditing ? tempUsername : username} 
      onChange={(e) => setTempUsername(e.target.value)} 
      InputProps={{
        readOnly: !isEditing,
        endAdornment: (
          <InputAdornment position='end'>
            {isEditing ? (
              <>
                <IconButton onClick={handleCheckClick}>
                  <CheckIcon />
                </IconButton>
                <IconButton onClick={handleCancelClick}>
                  <CancelIcon />
                </IconButton>
              </>
            ) : (
              <IconButton onClick={handleEditClick}>
                <EditIcon />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
      style={{width: '256px'}} // Fixed width
    />
  );
};

EditField.propTypes = {
  username: propTypes.string.isRequired,
  setUsername: propTypes.func.isRequired,
};

export default EditField;
