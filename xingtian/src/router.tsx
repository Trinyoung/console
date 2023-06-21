import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Spin } from 'antd'

export const ROUTE_BASE_NAME = window.__POWERED_BY_QIANKUN__ ? '/console': '/'
const ArticleStastics = lazy(() => import('./pages/article/index'))
const AppRouter = () => {
    return (
        <Router>
            <Suspense fallback={<Spin/>}>
                <Routes>
                    <Route path='/user' element={<ArticleStastics/>}></Route>
                </Routes>
            </Suspense>
        </Router>
    )
}
export default AppRouter