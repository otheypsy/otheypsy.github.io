import { StrictMode, Suspense } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/MainLayout/MainLayout.component'
import Error from './components/Error.component'
import Loading from './components/Loading.component'
import routes from './pages/main.routes'

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
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

const MainApp: React.FC = () => {
    return (
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    )
}

export default MainApp
