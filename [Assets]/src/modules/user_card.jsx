import React from 'react';
import propTypes from 'prop-types';
import { Grid, Avatar, Button, Paper } from '@mui/material';
import { EditField } from '../components';

import FileUploadIcon from '@mui/icons-material/FileUpload';

const UserCard = ({ username, setUsername, image, setImage }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '24px', borderRadius: '5px', maxWidth: '70vw' }}>
      <Grid container alignItems='center' spacing={2} justifyContent={'center'}>
        <Grid container item xs={6} alignItems='center' justifyContent={'center'}>
          <Avatar 
            alt='User Image' 
            src={image} 
            sx={{ 
              width: 256, 
              height: 256,
              border: '2px solid #000' 
            }} 
          />
        </Grid>
        <Grid container item xs={6} direction='column' alignItems='center' spacing={2}>
          <Grid item>
            <Button variant='contained' component='label' startIcon={<FileUploadIcon/>}>
              Upload Image
              <input type='file' hidden onChange={handleImageChange} />
            </Button>
          </Grid>
          <Grid item>
            <EditField username={username} setUsername={setUsername} />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

UserCard.propTypes = {
  username: propTypes.string.isRequired,
  setUsername: propTypes.func.isRequired,
  image: propTypes.string,
  setImage: propTypes.func.isRequired,
};

export default UserCard;
