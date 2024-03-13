import { Auth0ProviderWithNavigate } from "./components/auth0-provider-with-navigate";

export default function Providors({children}: {children: React.ReactNode}){

    return (
            <Auth0ProviderWithNavigate>
                {children}
            </Auth0ProviderWithNavigate>
    )
}
