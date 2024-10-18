import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';

import { getText } from "./language"

export const controlPanelMenuPages = [
    {
        type: "MenuItem",
        path: "",
        title: getText('NAV_CP_DASHBOARD'),
        icon: <HomeOutlinedIcon/>,
    }, 

    {
        type: "MenuItem",
        path: "payments",
        title: getText('NAV_CP_TARIF_PLAN'),
        icon: <LocalActivityOutlinedIcon/>,
    }, 
    
    {
        type: "MenuItem",
        path: "shop",
        title: getText('NAV_CP_SHOP'),
        icon:<ShoppingBagOutlinedIcon/>,
        list: [ ]
    },

    {
        type: "MenuItem",
        path: "paymethod",
        title: getText('NAV_CP_PAYMETHOD'),
        icon:<PaymentsOutlinedIcon/>
    },

    {
        type: "MenuItem",
        path: "delivery",
        title: getText('NAV_CP_DELIVERY'),
        icon:<LocalShippingOutlinedIcon/>
    },

    {
        type: "MenuItem",
        path: "modifiers",
        title: getText('NAV_CP_MODIFIERS'),
        icon:<AccountTreeOutlinedIcon/>
    },

    {
        type: "MenuItem",
        path: "category",
        title: getText('NAV_CP_CATEGORY'),
        icon:<ListAltOutlinedIcon/>
    },

    {
        type: "MenuItem",
        path: "products",
        title: getText('NAV_CP_PRODUCTS'),
        icon:<Inventory2OutlinedIcon/>
    },

    {
        type: "MenuItem",
        path: "stock",
        title: getText('NAV_CP_STOCK'),
        icon:<InventoryOutlinedIcon/>
    },

    {
        type: "MenuItem",
        path: "orders",
        title: getText('NAV_CP_ORDERS'),
        icon:<RequestQuoteOutlinedIcon/>
    },

    {
        type: "MenuItem",
        path: "customer",
        title: getText('NAV_CP_CUSTOMER'),
        icon:<PeopleOutlineOutlinedIcon/>
    },

    {
        type: "MenuItem",
        path: "faq",
        title: getText('NAV_CP_FAQ'),
        icon:<QuizOutlinedIcon/>
    }
    


]