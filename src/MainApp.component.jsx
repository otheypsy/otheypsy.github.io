import { StrictMode, Suspense } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/MainLayout/MainLayout.component.jsx'
import Error from './components/Error.component.jsx'
import Loading from './components/Loading.component.jsx'
import routes from './pages/main.routes.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout routes={routes} />,
        errorElement: <Error />,
        children: routes.map((route) => {
            return {
                path: route.path + '/',
                errorElement: <Error />,
                element: (
                    <Suspense fallback={<Loading />}>
                        <route.LazyComponent />
                    </Suspense>
                ),
            }
        }),
    },
])

const MainApp = () => {
    return (
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    )
}

export default MainApp
