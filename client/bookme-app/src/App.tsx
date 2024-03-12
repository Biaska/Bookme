import { Auth0ProviderWithNavigate } from "./components/auth0-provider-with-navigate";
import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom"

export default function App() {
  return (
    <>
      <Auth0ProviderWithNavigate>
          <div className="page">
              <Navbar />
              <div className="content">
                  <Outlet />
              </div>
          </div> 
      </Auth0ProviderWithNavigate>
    </>
  )
}

