import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";

import { Auth } from "./components/auth.tsx";

import App from "./App.tsx";
import ErrorPage from './pages/ErrorPage.tsx';
import CreateBusiness from "./pages/CreateBusiness.tsx";
import Home from './pages/Home.tsx';
import { Dashboard } from "./pages/Dashboard.tsx";
import VendorLanding  from "./pages/VendorLanding.tsx";
import CreateService from "./pages/CreateService.tsx";
import dashboardLoader from "./loaders/dashboardLoader.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route 
            path='/'
            element={<App />}
            errorElement={<ErrorPage />}
            >
            <Route index={true} element={<Home />}/>
            <Route path='Vendors' element={<VendorLanding />} />
            <Route path='Dashboard' loader={dashboardLoader} element={<Auth component={Dashboard}  />}/>
            <Route path='BusinessInit' element={<Auth component={CreateBusiness} />}/>
            <Route path='CreateService' element={<Auth component={CreateService} />}/>
            <Route path='Dashboard' element={<Auth component={Dashboard} />}/>
        </Route>
    )
    // {
    //     path: '/',
    //     element: <App />,
    //     errorElement: <ErrorPage />,
    //     children: [
    //         {
    //             index: true,
    //             element: <Home />,
    //         },
    //         {
    //             path: '/Dashboard',
    //             element: <Auth component={Dashboard} />,
    //         },
    //         {
    //             path: '/CreateService',
    //             element: <Auth component={CreateService} />,
    //         },
    //         {
    //             path: '/BusinessInit',
    //             element: <Auth component={CreateBusiness} />,
    //         },
    //         {
    //             path: '/Vendors',
    //             element: <VendorLanding />,
    //         },
    //     ]
    // }
)


export default function Router() {
    return (
        <RouterProvider router={router} />
    )
}