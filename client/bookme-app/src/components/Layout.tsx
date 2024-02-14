import Navbar from "./Navbar"
import { Outlet, useLocation } from "react-router-dom"

const Layout: React.FC = () => {
    const location = useLocation()
    return (
        <>
            <div className="page">
                <Navbar location={location.pathname}/>
                <div className="content">
                    <Outlet />
                </div>
            </div> 
        </>
    )
}
export default Layout