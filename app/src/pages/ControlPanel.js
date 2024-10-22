import React, {useRef, useEffect, useState} from 'react'
import { ColorModeContext, useMode } from '../theme'
import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import TopBar from '../components/controlPanel/TopBar'
import SideBar from '../components/controlPanel/SideBar'
import ControlPanelRouter from '../components/ControlPanelRouter';
import { tokens } from '../theme';

const ControlPanel = () => {

    const [theme, colorMode] = useMode()

    const colors = tokens(theme.palette.mode)

    const sideBarRef = useRef(null)

    const [ marginContent, setMarginContent ] = useState()

    useEffect( () => {
        const resizeSideBar = new ResizeObserver( ([{ target }]) => {
            const boundingClientRect = target.getBoundingClientRect()
            setMarginContent( boundingClientRect.width + 'px' )
        } )
        if( sideBarRef.current ){
            resizeSideBar.observe(sideBarRef.current)
        }
    }, [] )
  

    return (


        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className='dashboard flex'>
                    <div className="sideBar" ref={sideBarRef}>
                        <SideBar  />
                    </div>
                  
                    <Box sx={{
                        marginLeft : marginContent
                    }} className='content' p={2}>
                        <TopBar />
                        <Box sx={{
                            position: 'relative',
                            "& .addButton:hover" : {
                                background: `${colors.blue[600]} `,
                            },
                             "& .tableRow, & .cp_top_bar, & .cp_main": {
                                background: `${colors.black[900]} `,
                            },
                        }}>
                           
                            <ControlPanelRouter />
                            
                        </Box>
                    </Box>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>

    )
}

export default ControlPanel