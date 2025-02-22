import React from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Home, Favorite, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => {
            setValue(newValue);
            if (newValue === 0) navigate("/");
            if (newValue === 1) navigate("/liked");
            if (newValue === 2) navigate("/profile");
          }}
          
      >
        <BottomNavigationAction label="Home" icon={<Home />} />
        <BottomNavigationAction label="Liked" icon={<Favorite />} />
        <BottomNavigationAction label="Profile" icon={<Person />} />
      </BottomNavigation>
    </Paper>
  );
};

export default Navbar;
