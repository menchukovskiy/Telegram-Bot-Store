import {Route, Routes } from 'react-router-dom'
import Category from '../pages/controlPanel/Category'
import Dashboard from '../pages/controlPanel/Dashboard'
import Shop from '../pages/controlPanel/Shop'
import Paymethod from '../pages/controlPanel/Paymethod'
import Delivery from '../pages/controlPanel/Delivery'
import Products from '../pages/controlPanel/Products'
import Orders from '../pages/controlPanel/Orders'
import Customer from '../pages/controlPanel/Customer'
import Faq from '../pages/controlPanel/Faq'
import Page404 from '../pages/Page404'
import Stock from '../pages/controlPanel/Stock'
import Payments from '../pages/controlPanel/Payments'
import Modifiers from '../pages/controlPanel/Modifiers'
import ModifiersAdd from '../pages/controlPanel/ModifiersAdd'
import ModifiersEdit from '../pages/controlPanel/ModifiersEdit'
import ProductsAdd from '../pages/controlPanel/ProductsAdd'
import ProductsEdit from '../pages/controlPanel/ProductsEdit'
import StockAdd from '../pages/controlPanel/StockAdd'

const ControlPanelRouter =  () => {
    
    return(
        <Routes>
            <Route  path='/' element={<Dashboard/>}  />
            <Route  path='/payments' element={<Payments/>}  />
            <Route  path='/shop' element={<Shop/>}  />
            <Route  path='/category' element={<Category/>}  />
            <Route  path='/paymethod' element={<Paymethod/>}  />
            <Route  path='/delivery' element={<Delivery/>}  />
            <Route  path='/modifiers/' element={<Modifiers/>}  />
            <Route  path='/modifiers/add' element={<ModifiersAdd/>}  />
            <Route  path='/modifiers/edit/*' element={<ModifiersEdit/>}  />
            <Route  path='/stock' element={<Stock/>}  />
            <Route  path='/stock/add' element={<StockAdd/>}  />
            <Route  path='/products' element={<Products/>}  />
            <Route  path='/products/add' element={<ProductsAdd/>}  />
            <Route  path='/products/edit/*' element={<ProductsEdit/>}  />
            <Route  path='/orders' element={<Orders/>}  />
            <Route  path='/customer' element={<Customer/>}  />
            <Route  path='/faq' element={<Faq/>}  />
            <Route  path='*' element={<Page404/>}  />
        </Routes>
        
    )
}

export default ControlPanelRouter

