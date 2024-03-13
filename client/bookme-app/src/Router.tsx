import {
    Route,
    Routes,
  } from "react-router-dom";
import ErrorPage from './pages/ErrorPage.tsx';
import CreateBusiness from "./pages/CreateBusiness.tsx";
import Home from './pages/Home.tsx';
import Layout from "./components/Layout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import { Auth } from "./components/auth.tsx";
import VendorLanding  from "./pages/VendorLanding.tsx";
import CreateService from "./pages/CreateService.tsx";

export default function Router() {
    return (
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
                        element={<Auth component={Dashboard} />}
                    />
                    <Route
                        path="/CreateService"
                        element={<Auth component={CreateService}/>}    
                    />
                    <Route
                        path='/BusinessInit'
                        element={<Auth component={CreateBusiness}/>}
                    />
                    <Route 
                        path="Vendors"
                        element={<VendorLanding />}
                    />
            </Route>
        </Routes>
    )
}