import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

const PopUp = ({ title, message, imgSrc, closePopup }) => {
  const [progress, setProgress] = React.useState(0);
  const [fadeOut, setFadeOut] = React.useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          setFadeOut(true);
          setTimeout(() => closePopup(), 1000); // close after 1 second (length of fade out animation)
        }
        return Math.min(oldProgress + 1, 100);
      });
    }, 20); // adjust this value if you want the progress bar to fill faster or slower

    return () => {
      clearInterval(timer);
    };
  }, [closePopup]);

  return (
    <Box
      sx={{
        padding: "1em",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "opacity 0.5s ease-in",
        opacity: fadeOut ? 0 : 1,
        border: "1px solid black",
      }}
    >
      <Box sx={{ width: '100%'}}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body1">{message}</Typography>
      <img src={imgSrc} alt={title} style={{ width: "128px", height: "auto" }} />
    </Box>
  )
};

export default PopUp;
