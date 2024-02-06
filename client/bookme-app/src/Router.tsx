import {
    // createBrowserRouter,
    // RouterProvider,
    Route,
    Routes,
  } from "react-router-dom";
import ErrorPage from './pages/ErrorPage.tsx';
import Login from './pages/Login.tsx';
import Home from './pages/Home.tsx';
import Layout from "./components/Layout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import { Auth } from "./components/auth.tsx";

export default function Router() {
    
    // const router = createBrowserRouter([
    //     {
    //       path: "/",
    //       element: <Layout />,
    //       errorElement: <ErrorPage />,
    //       children: [
    //         {
    //           path: "/",
    //           element: <Home />,
    //         },
    //         {
    //           path: "/login",
    //           element: <Login />
    //         },
    //       ]
    //     },
    //   ]);
      
    return (
        // <RouterProvider router={router}>
        //     {children}
        // </RouterProvider>
        <Routes>
            <Route 
                path="/"
                element={<Layout />}
                errorElement={<ErrorPage />}
                >
                    <Route 
                        path="/"
                        element={<Home />} />
                    <Route 
                        path="/Dashboard"
                        element={<Auth component={Dashboard } />}
                    />
            </Route>
        </Routes>
    )
}