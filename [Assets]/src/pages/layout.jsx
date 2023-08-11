import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

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
      <Box
        sx={{
          height: 'calc(100vh - 1em)',
          display: 'flex',
          paddingLeft: '1em',
          paddingBottom: '1em',
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
