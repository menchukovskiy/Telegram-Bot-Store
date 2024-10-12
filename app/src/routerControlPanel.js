
import Page404 from './pages/Page404'
import Dashboard from './pages/controlPanel/Dashboard'
import Category from './pages/controlPanel/Category'

export const controlPanelRouts = [
    {
        path: '/',
        Component: <Dashboard />
    },

    {
        path: '/category',
        Component: <Category />
    },
    {
        path: '*',
        Component: <Page404 />
    }

]



