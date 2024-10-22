import { useState } from "react"
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar"
import { Box, IconButton, Typography, useTheme } from "@mui/material"
import { tokens } from "../../theme"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SideBarMenu from './SideBarMenu'

const SideBar = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [isCollapsed, setIsCollapsed] = useState(false)
    

    return (
        <Box 
            sx={{
                background: `${colors.black[900]} !important`,
                "& .ps-sidebar-container": {
                    background: `${colors.black[900]} !important`,
                },
                "& .ps-submenu-content": {
                    background: `${colors.black[800]} !important`,
                },

                "& .ps-menu-button:hover": {
                    backgroundColor: 'transparent !important',
                },
                "& .ps-sidebar-root": {
                    border: 'none !important'
                },
                "& span.ps-active": {
                    color: `${colors.blue[500]} `
                }
            }}>
            <Sidebar style={{ height: "100vh" }} collapsed={isCollapsed} >
                <Menu>
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px">
                                <Typography>LOGO</Typography>
                                <IconButton>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>


                    <SideBarMenu isCollapsed={isCollapsed} />

                </Menu>
            </Sidebar>
        </Box>
    )
}

export default SideBar