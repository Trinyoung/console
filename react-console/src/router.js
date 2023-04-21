import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {lazy, Suspense} from 'react';
import { Spin } from 'antd';
const Home = lazy(() =>import('./views/home'));
const AppRouter = () => {
    return (
        <Router>
            <Suspense fallback={<Spin/>}>
                <Routes>
                    <Route path='/home' element={<Home/>}></Route>
                </Routes>
            </Suspense>
        </Router>
    )
}
export default AppRouter;