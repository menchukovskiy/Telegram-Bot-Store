import { Box, IconButton, useTheme } from "@mui/material"
import { useContext } from "react"
import { ColorModeContext, tokens } from "../../theme"
import { InputBase } from "@mui/material"
import LigthModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from "@mui/icons-material/Search"
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { getText } from "../../utils/language"
import { useNavigate, useLocation } from 'react-router-dom'
import { INDEX } from "../../utils/const"
import { useDispatch } from "react-redux"
import { removeUser } from "../../store/slice/userSlice"

const TopBar = () => {

    const dispatch = useDispatch()
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext)
    const history = useNavigate()

    const logOut = () => {
      dispatch( removeUser() )
      history(INDEX)
    }
    
    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* SEARCH BAR */}
            <Box
                display="flex"
                backgroundColor={colors.grey[400]}
                borderRadius="3px"
            >
            <InputBase sx={{ml:2,flex:1}} placeholder={getText('SEARCH')} />
            <IconButton type="button" sx={{p:1}} >
                <SearchIcon />
            </IconButton>
            </Box>

            {/* ICON BAR */}

            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    { theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LigthModeOutlinedIcon />
                    ) }
                </IconButton>

                <IconButton>
                    <SettingsOutlinedIcon />
                </IconButton>

                <IconButton>
                    <PersonOutlinedIcon />
                </IconButton>

                <IconButton onClick={ logOut } >
                    <ExitToAppOutlinedIcon />
                </IconButton>
                   
            </Box>
            
        </Box>
    )
}


export default TopBar