import React, { useState } from 'react';
import Box from '@mui/material/Box';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const BottomNavBar = () => {
    const [value, setValue] = useState(0);
    return (
        <Box className="bottomNavBar">

            <BottomNavigation
            sx={{
                
                "& .MuiBottomNavigationAction-root": {
                    color: "var(--tg-theme-text-color)",
                }

                
            }}>
                className="bottomNav"
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
                <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
                <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
            </BottomNavigation>

        </Box>
    );
};

export default BottomNavBar;