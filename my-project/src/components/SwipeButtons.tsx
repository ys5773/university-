import React from "react";
import { IconButton, Stack } from "@mui/material";
import { Close, Favorite } from "@mui/icons-material";

interface SwipeButtonsProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const SwipeButtons: React.FC<SwipeButtonsProps> = ({ onSwipeLeft, onSwipeRight }) => {
  return (
    <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
      <IconButton color="error" onClick={onSwipeLeft}>
        <Close fontSize="large" />
      </IconButton>
      <IconButton color="success" onClick={onSwipeRight}>
        <Favorite fontSize="large" />
      </IconButton>
    </Stack>
  );
};

export default SwipeButtons;
