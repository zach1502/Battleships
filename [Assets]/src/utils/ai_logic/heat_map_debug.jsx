import React from 'react';

const Heatmap = ({ currentHeatMap }) => {
  // get max sum of base and tracking to scale heatmap intensity
  if (!currentHeatMap) return null;

  const maxHeat = Math.max(...currentHeatMap.flat().map(cell => cell.base + cell.tracking));

  return (
    <div className="heatmap" style={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      {currentHeatMap.map((row, i) => (
        <>
          <div key={i} className="heatmap-row" style={{display: 'flex'}}>
            {row.map((cell, j) => {
              const heatValue = (cell.base + cell.tracking) / maxHeat * 255;
              const color = `rgb(${255 - heatValue}, ${255 - heatValue}, 255)`;
              return (
                <div
                  key={j}
                  className="heatmap-cell"
                  style={{ backgroundColor: color, height: '20px', width: '20px' }}
                  title={`base: ${cell.base}, tracking: ${cell.tracking}`}
                >
                  {cell.base + cell.tracking}
                </div>
              );
            })}
          </div>
        </>
      ))}
    </div>
  );
};

export default Heatmap;