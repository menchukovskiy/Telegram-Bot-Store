import React, { useState } from 'react';
import Box from '@mui/material/Box';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const BottomNavBar = () => {
    const [value, setValue] = useState(0);
    return (
        <Box className="bottomNavBar">

            <BottomNavigation
            sx={{
                
                "& .MuiBottomNavigationAction-root": {
                    color: "var(--tg-theme-text-color)",
                }

                
            }}
                className="bottomNav"
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction label="Store" icon={<StorefrontIcon />} />
                <BottomNavigationAction label="Cart" icon={<ShoppingCartIcon />} />
                <BottomNavigationAction label="Acount" icon={<AccountCircleIcon />} />
            </BottomNavigation>

        </Box>
    );
};

export default BottomNavBar;