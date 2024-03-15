import { Auth0ProviderWithNavigate } from "./components/auth0-provider-with-navigate";
import { BrowserRouter } from "react-router-dom";

export default function Providors({children}: {children: React.ReactNode}){

    return (
        <BrowserRouter>
            <Auth0ProviderWithNavigate>
                {children}
            </Auth0ProviderWithNavigate>
        </BrowserRouter>
    )
}
