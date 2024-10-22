import {Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import LoadingBox from './controlPanel/moduls/LoadingBox'

const Category = lazy( () => import('../pages/controlPanel/Category') )
const Dashboard = lazy( () => import('../pages/controlPanel/Dashboard') )
const Shop = lazy( () => import('../pages/controlPanel/Shop') )
const Paymethod = lazy( () => import('../pages/controlPanel/Paymethod') )
const Delivery = lazy( () => import('../pages/controlPanel/Delivery') )
const Products = lazy( () => import('../pages/controlPanel/Products') )
const Orders = lazy( () => import('../pages/controlPanel/Orders') )
const Customer = lazy( () => import('../pages/controlPanel/Customer') )
const Faq = lazy( () => import('../pages/controlPanel/Faq') )
const Page404 = lazy( () => import('../pages/Page404') )
const Stock = lazy( () => import('../pages/controlPanel/Stock') )
const Payments = lazy( () => import('../pages/controlPanel/Payments') )
const Modifiers = lazy( () => import('../pages/controlPanel/Modifiers') )
const ModifiersAdd = lazy( () => import('../pages/controlPanel/ModifiersAdd') )
const ModifiersEdit = lazy( () => import('../pages/controlPanel/ModifiersEdit') )
const ProductsAdd = lazy( () => import('../pages/controlPanel/ProductsAdd') )
const ProductsEdit = lazy( () => import('../pages/controlPanel/ProductsEdit') )
const StockAdd = lazy( () => import('../pages/controlPanel/StockAdd') )


const ControlPanelRouter =  () => {
    
    return(
        <Routes>
            <Route  path='/' element={<Suspense fallback={<LoadingBox />}><Dashboard/></Suspense>}  />
            <Route  path='/payments' element={<Suspense fallback={<LoadingBox />}><Payments/></Suspense>}  />
            <Route  path='/shop' element={<Suspense fallback={<LoadingBox />}><Shop/></Suspense>}  />
            <Route  path='/category' element={<Suspense fallback={<LoadingBox />}><Category/></Suspense>}  />
            <Route  path='/paymethod' element={<Suspense fallback={<LoadingBox />}><Paymethod/></Suspense>}  />
            <Route  path='/delivery' element={<Suspense fallback={<LoadingBox />}><Delivery/></Suspense>}  />
            <Route  path='/modifiers/' element={<Suspense fallback={<LoadingBox />}><Modifiers/></Suspense>}  />
            <Route  path='/modifiers/add' element={<Suspense fallback={<LoadingBox />}><ModifiersAdd/></Suspense>}  />
            <Route  path='/modifiers/edit/*' element={<Suspense fallback={<LoadingBox />}><ModifiersEdit/></Suspense>}  />
            <Route  path='/stock' element={<Suspense fallback={<LoadingBox />}><Stock/></Suspense>}  />
            <Route  path='/stock/add' element={<Suspense fallback={<LoadingBox />}><StockAdd/></Suspense>}  />
            <Route  path='/products' element={<Suspense fallback={<LoadingBox />}><Products/></Suspense>}  />
            <Route  path='/products/add' element={<Suspense fallback={<LoadingBox />}><ProductsAdd/></Suspense>}  />
            <Route  path='/products/edit/*' element={<Suspense fallback={<LoadingBox />}><ProductsEdit/></Suspense>}  />
            <Route  path='/orders' element={<Suspense fallback={<LoadingBox />}><Orders/></Suspense>}  />
            <Route  path='/customer' element={<Suspense fallback={<LoadingBox />}><Customer/></Suspense>}  />
            <Route  path='/faq' element={<Suspense fallback={<LoadingBox />}><Faq/></Suspense>}  />
            <Route  path='*' element={<Suspense fallback={<LoadingBox />}><Page404/></Suspense>}  />
        </Routes>
        
    )
}

export default ControlPanelRouter

