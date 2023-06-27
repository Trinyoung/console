/* eslint-disable react-refresh/only-export-components */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Spin } from 'antd'

export const ROUTE_BASE_NAME = window.__POWERED_BY_QIANKUN__ ? '/xingtian': '/'

// 导入pages里面的article/index.tsx
const ArticleStastics = lazy(() => import('./pages/article/index'))
const AppRouter = () => {
    return (
        <Router basename={ROUTE_BASE_NAME}>
            <Suspense fallback={<Spin/>}>
                <Routes>
                    <Route path='/article' element={<ArticleStastics/>}></Route>
                </Routes>
            </Suspense>
        </Router>
    )
}
export default AppRouter