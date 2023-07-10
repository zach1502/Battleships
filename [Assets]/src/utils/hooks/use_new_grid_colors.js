import React from 'react';
import { shipGridLegend } from '../grid_legends';
import { Typography } from '@mui/material';

function useNewGridColors(settings) {
  const determineTextColor = React.useCallback((color) => {
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
  });

  React.useMemo(() => {
    const blankColor = settings.gridBlankColor;
    const missColor = settings.gridMissColor;
    const hitColor = settings.gridHitColor;

    shipGridLegend['null']['color'] = blankColor;
    shipGridLegend['miss']['color'] = missColor;
    shipGridLegend['hit']['color'] = hitColor;

    shipGridLegend['miss']['icon'] = (
      <Typography color={determineTextColor(missColor)}>M</Typography>
    );
    shipGridLegend['hit']['icon'] = (
      <Typography color={determineTextColor(hitColor)}>H</Typography>
    );

  }, [settings.gridBlankColor, settings.gridMissColor, settings.gridHitColor]);
}

export default useNewGridColors;