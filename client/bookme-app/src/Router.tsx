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
                        path='/BusinessInit'
                        element={<Auth component={CreateBusiness}/>}
                    />
            </Route>
        </Routes>
    )
}