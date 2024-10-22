import React, { useState } from 'react'
import { MenuItem, SubMenu } from "react-pro-sidebar"
import { Box } from "@mui/material"
import { Link, useLocation } from "react-router-dom"
import { controlPanelMenuPages } from '../../utils/controlPanelPages'

const SideBarMenu = (props) => {
    const history = useLocation()
    const [selected, setSelected] = useState((history.pathname.split('/')[2] ? history.pathname.split('/')[2] : ''))

    return (
        <Box>
            {controlPanelMenuPages.map(({ type, list, icon, path, title }, key) =>
                <Box key={key}>
                    {(type === "SubMenu")

                        ?
                        <SubMenu label={title} icon={icon}>
                            {list.map(({ icon, path, title }, key) =>
                                <MenuItem
                                    component={<Link to={path} />}
                                    icon={icon}
                                    key={key}
                                    active={selected === path}
                                    onClick={() => setSelected(path)}
                                >
                                    {!props.isCollapsed && (
                                        <Box>{title}</Box>
                                    )}

                                </MenuItem>
                            )}
                        </SubMenu>
                        : 
                        <MenuItem
                        component={<Link to={path} />}
                        icon={icon}
                        key={path}
                        active={selected === path}
                        onClick={() => setSelected(path)}
                    >
                        {!props.isCollapsed && (
                                <Box>{title}</Box>
                            )}
                        
                    </MenuItem>
                        }
                </Box>
            )}

        </Box>
    )

}

export default SideBarMenu