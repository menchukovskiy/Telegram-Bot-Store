import { Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import LoadingBox from './controlPanel/moduls/LoadingBox'

const Category = lazy(() => import('../pages/controlPanel/Category'))
const Dashboard = lazy(() => import('../pages/controlPanel/Dashboard'))
const Shop = lazy(() => import('../pages/controlPanel/Shop'))
const Paymethod = lazy(() => import('../pages/controlPanel/Paymethod'))
const Delivery = lazy(() => import('../pages/controlPanel/Delivery'))
const Products = lazy(() => import('../pages/controlPanel/Products'))
const Orders = lazy(() => import('../pages/controlPanel/Orders'))
const Customer = lazy(() => import('../pages/controlPanel/Customer'))
const Faq = lazy(() => import('../pages/controlPanel/Faq'))
const Page404 = lazy(() => import('../pages/Page404'))
const Stock = lazy(() => import('../pages/controlPanel/Stock'))
const Payments = lazy(() => import('../pages/controlPanel/Payments'))
const Modifiers = lazy(() => import('../pages/controlPanel/Modifiers'))
const ModifiersAdd = lazy(() => import('../pages/controlPanel/ModifiersAdd'))
const ModifiersEdit = lazy(() => import('../pages/controlPanel/ModifiersEdit'))
const ProductsAdd = lazy(() => import('../pages/controlPanel/ProductsAdd'))
const ProductsEdit = lazy(() => import('../pages/controlPanel/ProductsEdit'))
const StockAdd = lazy(() => import('../pages/controlPanel/StockAdd'))


const ControlPanelRouter = () => {

    return (
        <Suspense fallback={<LoadingBox />}>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/payments' element={<Payments />} />
                <Route path='/shop' element={<Shop />} />
                <Route path='/category' element={<Category />} />
                <Route path='/paymethod' element={<Paymethod />} />
                <Route path='/delivery' element={<Delivery />} />
                <Route path='/modifiers/' element={<Modifiers />} />
                <Route path='/modifiers/add' element={<ModifiersAdd />} />
                <Route path='/modifiers/edit/*' element={<ModifiersEdit />} />
                <Route path='/stock' element={<Stock />} />
                <Route path='/stock/add' element={<StockAdd />} />
                <Route path='/products' element={<Products />} />
                <Route path='/products/add' element={<ProductsAdd />} />
                <Route path='/products/edit/*' element={<ProductsEdit />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/customer' element={<Customer />} />
                <Route path='/faq' element={<Faq />} />
                <Route path='*' element={<Page404 />} />
            </Routes>
        </Suspense>

    )
}

export default ControlPanelRouter

