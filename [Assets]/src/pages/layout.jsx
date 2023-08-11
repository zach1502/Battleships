import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import Header from '../components/header';
import { useAchievements } from '../utils/hooks';
import {PopUp} from '../components';

const Layout = (props) => {
  const [activatePopupBox, setActivatePopupBox] = React.useState(false);

  const stats = props.stats;
  const settings = props.settings;

  const {theNewAchievement, clearNewAchievements} = useAchievements(stats, settings); // eslint-disable-line no-unused-vars

  React.useEffect(() => {
    if (theNewAchievement) {
      setActivatePopupBox(true);
    }
  }, [theNewAchievement]);

  return (
    <>
      <Header />
      <Box
        sx={{
          width: '90vw',
          height: '85vh',
          display: 'flex',
          border: '1px solid black',
          paddingLeft: '1em',
          paddingBottom: '1em',
          marginLeft: '5vw',
          marginRight: '5vw',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <Outlet />
      </Box>

      {activatePopupBox &&
        <Box        
          sx={{
            position: 'absolute',
            top: '10vh',
            right: '10vw',
            width: '20vw',
            overflow: 'auto'
          }}
        >
          <PopUp 
            title={theNewAchievement.name}
            message={theNewAchievement.description}
            imgSrc={theNewAchievement.image}
            closePopup={() => {
              setActivatePopupBox(false);
              clearNewAchievements();
            }}
          />
        </Box>
      }
    </>
  )
};

export default Layout;
