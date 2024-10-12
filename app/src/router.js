import ControlPanel from './pages/ControlPanel'
import Index from './pages/Index'
import Page404 from './pages/Page404'
import {CONTROL_PANEL_ROUTE, INDEX } from './utils/const'

export const authRoutes = [
    {
        path: CONTROL_PANEL_ROUTE + '/*',
        Component: <ControlPanel />
    }
]

export const publicRoutes = [
    {
        path: INDEX,
        Component: <Index />
    },
    {
        path: '*',
        Component: <Page404 />
    }
]

